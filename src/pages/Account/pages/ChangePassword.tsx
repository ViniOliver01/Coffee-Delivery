import { Input } from "../../../components/Form/Input/Input";
import Label from "../../../components/Form/Label/Label";

import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeSlash } from "phosphor-react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import FormError from "../../../components/Error/Form/FormError";
import Button from "../../../components/Form/Button/Button";
import { PasswordInputBox } from "../../../components/Form/Input/PasswordInputBox";
import { LabelBox } from "../../../components/Form/Label/LabelBox";
import VerifyPassword from "../../../components/Form/VerifyPassword/VerifyPassword";
import { AuthContext } from "../../../context/AuthContext";
import { verifyPassword } from "../../../utils/verifyPassword";
import { Card, Container, Title } from "./../Components/StyledComponents";

interface InputFormData {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

interface PasswordChecks {
  min_characters: boolean;
  min_numbers: boolean;
  min_lowercase: boolean;
  min_uppercase: boolean;
}

const schema = yup.object().shape({
  old_password: yup.string().strict(true).required("Senha antiga obrigatória"),
  new_password: yup
    .string()
    .strict(true)
    .required("Senha obrigatória") //(?=.*[!@#\$%\^&\*]) regex special
    .matches(/^(?=.{8,})/, "A senha deve conter no mínimo 8 caracteres")
    .matches(/^(?=.*[a-z])/, "A senha deve conter no mínimo 1 letra minuscula")
    .matches(/^(?=.*[A-Z])/, "A senha deve conter no mínimo 1 letra maiúscula")
    .matches(/^(?=.*[0-9])/, "A senha deve conter no mínimo 1 número"),
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
    watch,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { changePassword } = useContext(AuthContext);
  const [error, setErrors] = useState(undefined);

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passCheck, setPasswordCheck] = useState<PasswordChecks>({
    min_characters: false,
    min_lowercase: false,
    min_numbers: false,
    min_uppercase: false,
  });

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
      setErrors(response.message);
    }
  }

  watch((data) => {
    const passCheck = verifyPassword(data.new_password);
    setPasswordCheck(passCheck);
  });

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
                error={!!errors.old_password}
              />
              <button
                type="button"
                onClick={() => handlePasswordView("old_password")}
                tabIndex={-1}
              >
                {showOldPass ? <EyeSlash /> : <Eye />}
              </button>
            </PasswordInputBox>
            <FormError message={error} />
          </LabelBox>

          <LabelBox>
            <Label>Nova senha</Label>
            <PasswordInputBox>
              <Input
                type={showNewPass ? "text" : "password"}
                {...register("new_password")}
                error={!!errors.new_password}
              />
              <button
                type="button"
                onClick={() => handlePasswordView("new_password")}
                tabIndex={-1}
              >
                {showNewPass ? <EyeSlash /> : <Eye />}
              </button>
            </PasswordInputBox>
            <VerifyPassword check={passCheck} redErrorMessage={!!errors.new_password} />
          </LabelBox>

          <LabelBox>
            <Label>Confirmar senha</Label>
            <PasswordInputBox>
              <Input
                type={showConfirmPass ? "text" : "password"}
                {...register("confirm_new_password")}
                error={!!errors.confirm_new_password}
              />
              <button
                type="button"
                onClick={() => handlePasswordView("confirm_new_password")}
                tabIndex={-1}
              >
                {showConfirmPass ? <EyeSlash /> : <Eye />}
              </button>
            </PasswordInputBox>

            <FormError message={errors.confirm_new_password?.message} />
          </LabelBox>

          <Button type="submit">Salvar</Button>
        </form>
      </Card>
    </Container>
  );
}
