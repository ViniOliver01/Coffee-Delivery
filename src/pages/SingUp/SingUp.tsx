import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FcGoogle } from "react-icons/fc";
import Divider from "../../components/Divider";
import { api } from "../../services/apiClient";
import { login } from "../../services/auth";
import {
  Button,
  Card,
  Container,
  Form,
  Input,
  Label,
  LabelBox,
  Title,
} from "./SingUp.styles";

interface SingUpProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function SingUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
          login(response.data.token);
        }
      });
  }

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
          </LabelBox>

          <LabelBox>
            <Label htmlFor="">Confirmar senha</Label>
            <Input type="password" {...register("passwordConfirmation")} />
          </LabelBox>

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
