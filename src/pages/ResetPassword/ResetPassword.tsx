import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Container, Form, Title } from "./styles";

import { useToast } from "@chakra-ui/react";
import YupPassword from "yup-password";
import FormError from "../../components/Error/Form/FormError";
import Button from "../../components/Form/Button";
import { Card } from "../../components/Form/Card";
import { Input } from "../../components/Form/Input";
import Label from "../../components/Form/Label";
import { LabelBox } from "../../components/Form/LabelBox";
import VerifyPassword from "../../components/VerifyPassword/VerifyPassword";
import { verifyPassword } from "../../utils/verifyPassword";

interface InputFormData {
  password: string;
  passwordConfirmation: string;
}

interface PasswordChecks {
  min_characters: boolean;
  min_numbers: boolean;
  min_lowercase: boolean;
  min_uppercase: boolean;
}

YupPassword(yup);

const schema = yup.object().shape({
  password: yup
    .string()
    .strict(true)
    .required("Senha obrigatória") //(?=.*[!@#\$%\^&\*]) regex special
    .matches(/^(?=.{8,})/, "A senha deve conter no mínimo 8 caracteres")
    .matches(/^(?=.*[a-z])/, "A senha deve conter no mínimo 1 letra minuscula")
    .matches(/^(?=.*[A-Z])/, "A senha deve conter no mínimo 1 letra maiúscula")
    .matches(/^(?=.*[0-9])/, "A senha deve conter no mínimo 1 número"),
  passwordConfirmation: yup
    .string()
    .required("Senha obrigatória")
    .oneOf([yup.ref("password"), null], "As senhas precisam coincidirem"),
});

export default function ResetPassword() {
  const { reset_token } = useParams();
  console.log("🚀 / ResetPassword / id:", reset_token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const toast = useToast();
  const navigation = useNavigate();
  const { isAuthenticated, resetPassword, verifyResetToken } = useContext(AuthContext);
  const [error, setErrors] = useState("");
  const [isFetchingToken, setIsFetchingToken] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [passCheck, setPasswordCheck] = useState<PasswordChecks>({
    min_characters: false,
    min_lowercase: false,
    min_numbers: false,
    min_uppercase: false,
  });

  async function onSubmit(data: FieldValues) {
    setIsFetching(true);
    const response = await resetPassword({
      reset_token,
      password: data.password,
    });

    if (response.status === 400) {
      setErrors(response.message);
    }

    if (response.status === 200) {
      toast({
        title: response.message,
        description: "Senha alterada com sucesso",
        status: "success",
        duration: 10000,
      });
      navigation("/login");
    }
    setIsFetching(false);
  }

  watch((data) => {
    const passCheck = verifyPassword(data.password);
    setPasswordCheck(passCheck);
  });

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    async function verifyToken() {
      const response = await verifyResetToken(reset_token);

      if (response.status === 400) {
        setIsFetchingToken(false);
        navigation("/");
      }
      if (response.status === 200) {
        setIsFetchingToken(true);
      }
    }
    verifyToken();
  }, []);

  if (isFetchingToken === null) {
    return <></>;
  }

  return (
    <Container>
      <Title>
        <h1>Redefinir senha</h1>
        <p>Insira uma nova senha e em seguida confirme</p>
      </Title>
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <Label>Nova senha</Label>
            <Input type="password" {...register("password")} />

            <VerifyPassword check={passCheck} />
          </LabelBox>

          <LabelBox>
            <Label>Confirmar nova senha</Label>
            <Input type="password" {...register("passwordConfirmation")} />
          </LabelBox>

          {error && <FormError message={error} />}

          <Button type="submit" isLoading={isFetching}>
            Alterar senha
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
