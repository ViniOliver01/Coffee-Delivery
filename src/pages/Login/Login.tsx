import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Divider from "../../components/Divider";
import { AuthContext } from "../../context/AuthContext";
import { Container, FooterTitle, Form, Options, Title } from "./Login.styles";

import { Checkbox } from "@chakra-ui/react";
import { Eye, EyeSlash } from "phosphor-react";
import FormError from "../../components/Error/Form/FormError";
import Button from "../../components/Form/Button/Button";
import GoogleButton from "../../components/Form/Button/GoogleButton";
import { Link } from "../../components/Form/Button/Link";
import { Card } from "../../components/Form/Card";
import { Input } from "../../components/Form/Input/Input";
import { PasswordInputBox } from "../../components/Form/Input/PasswordInputBox";
import Label from "../../components/Form/Label/Label";
import { LabelBox } from "../../components/Form/Label/LabelBox";

interface InputFormData {
  email: string;
  password: string;
  remember: boolean;
}

const schema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("Tipo de e-mail invalido"),
  password: yup.string().required("Senha obrigatória"),
  remember: yup.boolean(),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { signIn, isAuthenticated } = useContext(AuthContext);
  const [error, setErrors] = useState(undefined);
  const [showOldPass, setShowOldPass] = useState(false);
  const navigation = useNavigate();

  async function onSubmit(data: FieldValues) {
    const response = await signIn({
      email: data.email,
      password: data.password,
      remember: data.remember,
    });

    if (response.status === 401) {
      setErrors(response.message);
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  function GoToSingUp() {
    navigation("/singup");
  }

  function GoToForgetPassword() {
    navigation("/resetpassword");
  }

  return (
    <Container>
      <Title>
        <h1>Bem vindo de volta</h1>
        <p>Entre com seus dados ou continue com o Google</p>
      </Title>
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
          </LabelBox>

          <LabelBox>
            <Label>Senha</Label>
            <PasswordInputBox>
              <Input
                type={showOldPass ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowOldPass(!showOldPass)}
                tabIndex={-1}
              >
                {showOldPass ? <EyeSlash /> : <Eye />}
              </button>
            </PasswordInputBox>
            <FormError message={error} />
          </LabelBox>

          <Options>
            <Checkbox defaultChecked {...register("remember")}>
              <p>Lembrar dados de login</p>
            </Checkbox>

            <Link onClick={GoToForgetPassword}>Esqueci minha senha</Link>
          </Options>

          <Button type="submit">Login</Button>
        </Form>

        <Divider>ou</Divider>

        <GoogleButton />
        <FooterTitle>
          <h2>Não tem login? </h2>
          <Link onClick={GoToSingUp}>Cadastre-se</Link>
        </FooterTitle>
      </Card>
    </Container>
  );
}
