import { Input } from "../../../components/Form/Input";
import Label from "../../../components/Form/Label";

import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeSlash } from "phosphor-react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import FormError from "../../../components/Error/Form/FormError";
import InputError from "../../../components/Error/Form/InputError";
import Button from "../../../components/Form/Button";
import { PasswordInputBox } from "../../../components/Form/PasswordInputBox";
import { AuthContext } from "../../../context/AuthContext";
import { LabelBox } from "./../../../components/Form/LabelBox";
import { Card, Container, Title } from "./../Components/StyledComponents";

interface InputFormData {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

const schema = yup.object().shape({
  old_password: yup.string().strict(true).required("Senha antiga obrigatória"),
  new_password: yup
    .string()
    .strict(true)
    .required("Senha obrigatória") //(?=.*[!@#\$%\^&\*]) regex special
    .matches(/^(?=.{8,})/, "A senha deve conter no mínimo 8 caracteres")
    .matches(/^(?=.*[a-z])/, "One Uppercase")
    .matches(/^(?=.*[A-Z])/, "One Uppercase")
    .matches(/^(?=.*[0-9])/, "One Number"),
  confirm_new_password: yup
    .string()
    .strict(true)
    .required("Senha obrigatória")
    .oneOf([yup.ref("new_password"), null], "As senhas precisam coincidirem"),
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

  const { changePassword } = useContext(AuthContext);
  const [error, setErrors] = useState("");

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function handlePasswordView(
    type: "old_password" | "new_password" | "confirm_new_password"
  ) {
    if (type === "old_password") {
      setShowOldPass(!showOldPass);
    }
    if (type === "new_password") {
      setShowNewPass(!showNewPass);
    }
    if (type === "confirm_new_password") {
      setShowConfirmPass(!showConfirmPass);
    }
  }

  async function onSubmit(data: FieldValues) {
    const { old_password, new_password, confirm_new_password } = data;

    const response = await changePassword({
      old_password,
      new_password,
      confirm_new_password,
    });

    if (response.status === 400) {
      setErrors("Senha invalida");
    }
  }

  return (
    <Container>
      <Title>Alterar senha</Title>
      <Card display="flex" padding="40px 60px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <Label>Senha antiga</Label>
            <PasswordInputBox>
              <Input
                type={showOldPass ? "text" : "password"}
                {...register("old_password")}
              />
              <button type="button" onClick={() => handlePasswordView("old_password")}>
                {showOldPass ? <EyeSlash /> : <Eye />}
              </button>
            </PasswordInputBox>
            {errors.old_password && <InputError message={errors.old_password.message} />}
            {error && <FormError message={error} />}
          </LabelBox>

          <LabelBox>
            <Label>Nova senha</Label>
            <PasswordInputBox>
              <Input
                type={showNewPass ? "text" : "password"}
                {...register("new_password")}
              />
              <button type="button" onClick={() => handlePasswordView("new_password")}>
                {showNewPass ? <EyeSlash /> : <Eye />}
              </button>
            </PasswordInputBox>
            {errors.new_password && <InputError message={errors.new_password.message} />}
          </LabelBox>

          <LabelBox>
            <Label>Confirmar senha</Label>
            <PasswordInputBox>
              <Input
                type={showConfirmPass ? "text" : "password"}
                {...register("confirm_new_password")}
              />
              <button
                type="button"
                onClick={() => handlePasswordView("confirm_new_password")}
              >
                {showConfirmPass ? <EyeSlash /> : <Eye />}
              </button>
            </PasswordInputBox>

            {errors.confirm_new_password && (
              <InputError message={errors.confirm_new_password.message} />
            )}
          </LabelBox>

          <Button type="submit">Salvar</Button>
        </form>
      </Card>
    </Container>
  );
}
