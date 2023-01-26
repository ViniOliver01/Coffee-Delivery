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
import { Input } from "../../components/Form/Input";
import { Label } from "../../components/Form/Label";
import { AuthContext } from "../../context/AuthContext";
import { Button, Card, Container, Form, LabelBox, Title } from "./SingUp.styles";

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
    .matches(/^(?=.*[a-z])/, "One Uppercase")
    .matches(/^(?=.*[A-Z])/, "One Uppercase")
    .matches(/^(?=.*[0-9])/, "One Number"),
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
    mode: "onSubmit",
  });

  console.log("🚀 / SingUp / errors", errors);

  const { signUp, isAuthenticated } = useContext(AuthContext);
  const [error, setErrors] = useState("");
  const [passwordCheck, setPasswordCheck] = useState<PasswordChecks>({
    minCharacters: false,
    minLowercase: false,
    minNumbers: false,
    minUppercase: false,
  });

  async function onSubmit(data: FieldValues) {
    console.log(data);

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
    let passwordCheck = {
      minCharacters: false,
      minLowercase: false,
      minNumbers: false,
      minUppercase: false,
    };

    password.length >= 8
      ? (passwordCheck.minCharacters = true)
      : (passwordCheck.minCharacters = false);

    /[0-9]/.test(password)
      ? (passwordCheck.minNumbers = true)
      : (passwordCheck.minNumbers = false);

    /[a-z]/.test(password)
      ? (passwordCheck.minLowercase = true)
      : (passwordCheck.minLowercase = false);

    /[A-Z]/.test(password)
      ? (passwordCheck.minUppercase = true)
      : (passwordCheck.minUppercase = false);

    console.log("🚀 / verifyPassword / passwordCheck", passwordCheck);
    setPasswordCheck(passwordCheck);
  }
  console.log("🚀 / verifyPassword / passwordCheck", passwordCheck);

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
            <Label htmlFor="">Nome</Label>
            <Input type="text" {...register("name")} />
          </LabelBox>

          <LabelBox>
            <Label htmlFor="">Email</Label>
            <Input type="email" {...register("email")} />
          </LabelBox>

          <LabelBox>
            <Label htmlFor="">Senha</Label>
            <Input type="password" {...register("password")} />
            {errors.password && <InputError message={errors.password.message} />}
            {!passwordCheck.minCharacters && <InputError message="minCharacters" />}
            {!passwordCheck.minUppercase && <InputError message="minUppercase" />}
            {!passwordCheck.minLowercase && <InputError message="minLowercase" />}
            {!passwordCheck.minNumbers && <InputError message="minNumbers" />}
          </LabelBox>

          <LabelBox>
            <Label htmlFor="">Confirmar senha</Label>
            <Input type="password" {...register("passwordConfirmation")} />
            {errors.passwordConfirmation && (
              <InputError message={errors.passwordConfirmation.message} />
            )}
          </LabelBox>

          {error && <FormError message={error} />}

          <Button login type="submit">
            Criar conta
          </Button>
        </Form>

        <Divider>ou</Divider>

        <Button>
          <FcGoogle size={24} />
          Entrar com o google
        </Button>
      </Card>
    </Container>
  );
}
