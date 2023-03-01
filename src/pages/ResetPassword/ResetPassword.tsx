import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { Navigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Container, Form, Title } from "./styles";

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
  const { id } = useParams();
  console.log("🚀 / ResetPassword / id:", id);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { isAuthenticated, resetPassword } = useContext(AuthContext);
  const [error, setErrors] = useState("");
  const [passCheck, setPasswordCheck] = useState<PasswordChecks>({
    min_characters: false,
    min_lowercase: false,
    min_numbers: false,
    min_uppercase: false,
  });

  async function onSubmit(data: FieldValues) {
    const response = await resetPassword({
      reset_token: id,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    });

    if (response.status === 400) {
      setErrors(response.message);
    }
  }

  watch((data) => {
    const passCheck = verifyPassword(data.password);
    setPasswordCheck(passCheck);
  });

  if (isAuthenticated) {
    return <Navigate to="/" />;
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

          <Button type="submit">Login</Button>
        </Form>
      </Card>
    </Container>
  );
}
