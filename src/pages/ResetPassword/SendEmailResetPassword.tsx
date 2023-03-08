import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Container, Form, Title } from "./styles";

import { useToast } from "@chakra-ui/react";
import FormError from "../../components/Error/Form/FormError";
import Button from "../../components/Form/Button/Button";
import { Card } from "../../components/Form/Card";
import { Input } from "../../components/Form/Input/Input";
import Label from "../../components/Form/Label/Label";
import { LabelBox } from "../../components/Form/Label/LabelBox";

interface InputFormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("Tipo de e-mail invalido"),
});

export default function SendEmailResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  console.log("🚀 / SendEmailResetPassword / errors:", errors);

  const toast = useToast();
  const { sendEmailResetPassword, isAuthenticated } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setErrors] = useState("");

  async function onSubmit(data: FieldValues) {
    setIsFetching(true);
    const response = await sendEmailResetPassword(data.email);

    if (response.status === 200) {
      toast({
        title: "Email enviado",
        description:
          "Email de recuperação de senha enviado. Favor verifique sua caixa de email",
        status: "success",
        duration: 10000,
      });
    }

    if (response.status === 400) {
      setErrors(response.message);
    }
    setIsFetching(false);
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Title>
        <h1>Esqueci minha senha</h1>
        <p>Insira seu e-mail para que possamos enviar um link de redefinição de senha</p>
      </Title>
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
          </LabelBox>

          {error && <FormError message={error} />}

          <Button type="submit" isLoading={isFetching}>
            Enviar
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
