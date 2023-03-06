import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import Divider from "../../components/Divider";
import FormError from "../../components/Error/Form/FormError";
import InputError from "../../components/Error/Form/InputError";
import Button from "../../components/Form/Button";
import { Card } from "../../components/Form/Card";
import GoogleButton from "../../components/Form/GoogleButton";
import { Input } from "../../components/Form/Input";
import Label from "../../components/Form/Label";
import { LabelBox } from "../../components/Form/LabelBox";
import VerifyPassword from "../../components/VerifyPassword/VerifyPassword";
import { AuthContext } from "../../context/AuthContext";
import { verifyPassword } from "../../utils/verifyPassword";
import { Container, Form, Title } from "./SingUp.styles";

interface InputFormData {
  name: string;
  email: string;
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
  email: yup.string().required("E-mail obrigatório").email("Tipo de e-mail invalido"),
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

export default function SingUp() {
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
  const { signUp, signIn } = useContext(AuthContext);
  const [error, setErrors] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [passCheck, setPasswordCheck] = useState<PasswordChecks>({
    min_characters: false,
    min_lowercase: false,
    min_numbers: false,
    min_uppercase: false,
  });

  async function onSubmit(data: FieldValues) {
    setIsFetching(true);
    const response = await signUp({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response.status === 400) {
      setErrors(response.message);
    }

    if (response.status === 201) {
      toast({
        title: response.message,
        description: "Favor verifique sua caixa de email",
        status: "success",
        duration: 10000,
      });
      await signIn({
        email: data.email,
        password: data.password,
        remember: data.remember,
      });
    }
    setIsFetching(false);
  }

  watch((data) => {
    const passCheck = verifyPassword(data.password);
    setPasswordCheck(passCheck);
  });

  return (
    <Container>
      <Title>
        <h1>Bem vindo</h1>
        <p>Entre com o Google ou faça seu cadastro</p>
      </Title>
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <Label>Nome</Label>
            <Input type="text" {...register("name")} />
          </LabelBox>

          <LabelBox>
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
          </LabelBox>

          <LabelBox>
            <Label>Senha</Label>
            <Input type="password" {...register("password")} />
            <VerifyPassword check={passCheck} />
          </LabelBox>

          <LabelBox>
            <Label>Confirmar senha</Label>
            <Input type="password" {...register("passwordConfirmation")} />
            {errors.passwordConfirmation && (
              <InputError message={errors.passwordConfirmation.message} />
            )}
          </LabelBox>

          {error && <FormError message={error} />}

          <Button type="submit" isLoading={isFetching}>
            Criar conta
          </Button>
        </Form>

        <Divider>ou</Divider>

        <GoogleButton />
      </Card>
    </Container>
  );
}
