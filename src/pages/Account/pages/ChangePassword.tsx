import { Button } from "../../../components/Form/Button";
import { Input } from "../../../components/Form/Input";
import Label from "../../../components/Form/Label";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import FormError from "../../../components/Error/Form/FormError";
import InputError from "../../../components/Error/Form/InputError";
import { LabelBox } from "./../../../components/Form/LabelBox";
import { Card, Container, Title } from "./../Components/StyledComponents";

interface InputFormData {
  password_old: string;
  password_new: string;
  password_new_confirm: boolean;
}

const schema = yup.object().shape({
  password_old: yup.string().strict(true).required("Senha antiga obrigatória"),
  password_new: yup
    .string()
    .strict(true)
    .required("Senha obrigatória") //(?=.*[!@#\$%\^&\*]) regex special
    .matches(/^(?=.{8,})/, "A senha deve conter no mínimo 8 caracteres")
    .matches(/^(?=.*[a-z])/, "One Uppercase")
    .matches(/^(?=.*[A-Z])/, "One Uppercase")
    .matches(/^(?=.*[0-9])/, "One Number"),
  password_new_confirm: yup
    .string()
    .required("Senha obrigatória")
    .oneOf([yup.ref("password_new"), null], "As senhas precisam coincidirem"),
});

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  console.log("🚀 / Login / errors", errors);

  const [error, setErrors] = useState("");

  async function onSubmit(data: FieldValues) {
    console.log(data);

    // if (response.status === 400) {
    //   setErrors(response.message);
    // }
    setErrors("Senha invalida");
  }

  return (
    <Container>
      <Title>Alterar senha</Title>
      <Card display="flex" padding="40px 60px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <Label>Senha antiga</Label>
            <Input type="password" {...register("password_old")} />
            {errors.password_old && <InputError message={errors.password_old.message} />}
            {error && <FormError message={error} />}
          </LabelBox>
          <LabelBox>
            <Label>Nova senha</Label>
            <Input type="password" {...register("password_new")} />
            {errors.password_new && <InputError message={errors.password_new.message} />}
          </LabelBox>

          <LabelBox>
            <Label>Confirmar senha</Label>
            <Input type="password" {...register("password_new_confirm")} />
            {errors.password_new_confirm && (
              <InputError message={errors.password_new_confirm.message} />
            )}
          </LabelBox>

          <Button login type="submit">
            Salvar
          </Button>
        </form>
      </Card>
    </Container>
  );
}
