import { yupResolver } from "@hookform/resolvers/yup";
import { Pencil } from "phosphor-react";
import { useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import InputError from "../../components/Error/Form/InputError";

import { Input } from "../../components/Form/Input";
import Label from "../../components/Form/Label";
import { AuthContext } from "../../context/AuthContext";
import Divider from "./../../components/Divider/index";
import { Button } from "./../../components/Form/Button";
import { LabelBox } from "./../../components/Form/LabelBox";
import defaultTheme from "./../../styles/themes/Default";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 4rem;
  min-width: 400px;
  width: fit-content;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme["base-card"]};
  gap: 0.75rem;
  margin: auto;

  button {
    margin-top: 1rem;
  }
  form {
    width: 100%;
  }
`;
const EditButton = styled.button`
  background-color: ${defaultTheme.purple};
  color: ${defaultTheme.white};
  padding: 0.4rem;
  border-radius: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const AvatarImage = styled.img`
  width: 128px;
  border-radius: 100%;
`;

const ImageChangeArea = styled.div`
  position: relative;
`;

interface InputFormData {
  name: string;
  email: string;
  phone: string;
}

const schema = yup.object().shape({
  name: yup.string().strict(true).required("Nome obrigatório"),
  email: yup.string().strict(true).required("E-mail obrigatório"),
  phone: yup.string().strict(true).required("Número de telefone obrigatório"),
});

export default function MyAccount() {
  const { isAuthenticated, user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  console.log("🚀 / Login / errors", errors);

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <Card>
      <h2>MyAccount</h2>
      <ImageChangeArea>
        <AvatarImage src={user.avatar_url} alt="" />
        <EditButton>
          <Pencil size={24} />
        </EditButton>
      </ImageChangeArea>

      <h3>Dados Pessoais</h3>
      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelBox>
          <Label>Nome</Label>
          <Input type="text" {...register("name")} />
          {errors.name && <InputError message={errors.name.message} />}
        </LabelBox>

        <LabelBox>
          <Label>E-mail</Label>
          <Input type="email" {...register("email")} />
          {errors.email && <InputError message={errors.email.message} />}
        </LabelBox>

        <LabelBox>
          <Label>Número de telefone</Label>
          <Input type="tel" {...register("phone")} />
          {errors.phone && <InputError message={errors.phone.message} />}
        </LabelBox>

        <Button login>Salvar</Button>
      </form>
    </Card>
  );
}
