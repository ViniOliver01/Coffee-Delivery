import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Divider from "../../components/Divider";
import { AuthContext } from "../../context/AuthContext";
import { Container, Form, Options, Title } from "./Login.styles";

import { Checkbox } from "@chakra-ui/react";
import FormError from "../../components/Error/Form/FormError";
import Button from "../../components/Form/Button";
import { Card } from "../../components/Form/Card";
import { Input } from "../../components/Form/Input";
import Label from "../../components/Form/Label";
import { LabelBox } from "../../components/Form/LabelBox";
import { Link } from "./../../components/Form/Link";

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
  const [error, setErrors] = useState("");
  const navigation = useNavigate();

  async function onSubmit(data: FieldValues) {
    const response = await signIn({ email: data.email, password: data.password });

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
    navigation("/singup");
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
            <Input type="password" {...register("password")} />
          </LabelBox>

          {error && <FormError message={error} />}

          <Options>
            <Checkbox defaultChecked {...register("remember")}>
              <p>Lembrar dados de login</p>
            </Checkbox>

            <Link onClick={GoToForgetPassword}>Esqueci minha senha</Link>
          </Options>

          <Button type="submit">Login</Button>
        </Form>

        <Divider>ou</Divider>

        <Button leftIcon={<FcGoogle size={24} />} color={"gray"}>
          Entrar com o google
        </Button>

        <h2>
          Não tem login? <Link onClick={GoToSingUp}>Cadastre-se</Link>
        </h2>
      </Card>
    </Container>
  );
}
