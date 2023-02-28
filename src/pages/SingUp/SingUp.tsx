import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import YupPassword from "yup-password";
import Divider from "../../components/Divider";
import FormError from "../../components/Error/Form/FormError";
import InputError from "../../components/Error/Form/InputError";
import Button from "../../components/Form/Button";
import { Card } from "../../components/Form/Card";
import { Input } from "../../components/Form/Input";
import Label from "../../components/Form/Label";
import { LabelBox } from "../../components/Form/LabelBox";
import VerifyLabel from "../../components/Form/VerifyLabel";
import { AuthContext } from "../../context/AuthContext";
import { Container, Form, Title } from "./SingUp.styles";

interface InputFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface PasswordChecks {
  minCharacters: boolean;
  minNumbers: boolean;
  minLowercase: boolean;
  minUppercase: boolean;
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

  const { signUp } = useContext(AuthContext);
  const [error, setErrors] = useState("");
  const [passCheck, setPasswordCheck] = useState<PasswordChecks>({
    minCharacters: false,
    minLowercase: false,
    minNumbers: false,
    minUppercase: false,
  });

  async function onSubmit(data: FieldValues) {
    const response = await signUp({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response.status === 400) {
      setErrors(response.message);
    }
  }

  function verifyPassword(password: string) {
    let passCheck = {
      minCharacters: false,
      minLowercase: false,
      minNumbers: false,
      minUppercase: false,
    };

    password.length >= 8
      ? (passCheck.minCharacters = true)
      : (passCheck.minCharacters = false);

    /[0-9]/.test(password)
      ? (passCheck.minNumbers = true)
      : (passCheck.minNumbers = false);

    /[a-z]/.test(password)
      ? (passCheck.minLowercase = true)
      : (passCheck.minLowercase = false);

    /[A-Z]/.test(password)
      ? (passCheck.minUppercase = true)
      : (passCheck.minUppercase = false);

    setPasswordCheck(passCheck);
  }

  watch((data) => {
    verifyPassword(data.password);
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
            <span>A senha deve conter no mínimo:</span>

            <VerifyLabel isCheck={passCheck.minCharacters}>8 caracteres</VerifyLabel>

            <VerifyLabel isCheck={passCheck.minUppercase}>1 letra maiúscula</VerifyLabel>

            <VerifyLabel isCheck={passCheck.minLowercase}>1 letra minuscula</VerifyLabel>

            <VerifyLabel isCheck={passCheck.minNumbers}>1 número</VerifyLabel>
          </LabelBox>

          <LabelBox>
            <Label>Confirmar senha</Label>
            <Input type="password" {...register("passwordConfirmation")} />
            {errors.passwordConfirmation && (
              <InputError message={errors.passwordConfirmation.message} />
            )}
          </LabelBox>

          {error && <FormError message={error} />}

          <Button type="submit">Criar conta</Button>
        </Form>

        <Divider>ou</Divider>

        <Button leftIcon={<FcGoogle size={24} />} color={"gray"}>
          Entrar com o google
        </Button>
      </Card>
    </Container>
  );
}
