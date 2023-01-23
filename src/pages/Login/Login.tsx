import { Checkbox } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import Divider from "../../components/Divider";
import { login } from "../../services/auth";
import api from "./../../services/api";
import {
  Button,
  Card,
  Container,
  Form,
  Input,
  Label,
  LabelBox,
  Options,
  Title,
} from "./Login.styles";

interface InputFormData {
  email: string;
  password: string;
  remember: boolean;
}

const schema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("Tipo de e-mail invalido"),
  password: yup.string().required("Senha obrigatória").min(4, "Minimo de 4 digitos"),
  remember: yup.boolean(),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  console.log("🚀 / Login / errors", errors);

  function onSubmit(data: FieldValues) {
    data.email;
    api
      .post("http://localhost:3333" + "/sessions", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          login(response.data);
        }
      });
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
            <Label htmlFor="">Email</Label>
            <Input type="email" {...register("email")} />
          </LabelBox>

          <LabelBox>
            <Label htmlFor="">Senha</Label>
            <Input type="password" {...register("password")} />
          </LabelBox>

          <Options>
            <Checkbox defaultChecked {...register("remember")}>
              <p>Lembrar dados de login</p>
            </Checkbox>

            <a href="">Esqueci minha senha</a>
          </Options>

          <Button login type="submit">
            Login
          </Button>
        </Form>

        <Divider>ou</Divider>

        <Button>
          <FcGoogle size={24} />
          Entrar com o google
        </Button>

        <h2>
          Não tem login? <a href="/singup">Cadastre-se</a>{" "}
        </h2>
      </Card>
    </Container>
  );
}
