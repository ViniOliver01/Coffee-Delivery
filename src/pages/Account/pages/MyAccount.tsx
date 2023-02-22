import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import InputError from "../../../components/Error/Form/InputError";

import { Avatar, useToast } from "@chakra-ui/react";
import { Pencil } from "phosphor-react";
import { ChangeEvent } from "react";
import { Input } from "../../../components/Form/Input";
import Label from "../../../components/Form/Label";
import { MaskedInput } from "../../../components/Form/MaskedInput";
import { AuthContext } from "../../../context/AuthContext";
import Divider from "./../../../components/Divider/index";
import Button from "./../../../components/Form/Button";
import { LabelBox } from "./../../../components/Form/LabelBox";
import {
  AvatarLabel,
  Card,
  Container,
  ImageChangeArea,
  ImgWarp,
  LabelTest,
  Title,
} from "./../Components/StyledComponents";

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
  const { isAuthenticated, user, updatePersonalData, updateAvatar } =
    useContext(AuthContext);

  const [avatarFile, setAvatarFile] = useState<File>(null);
  const [selectedImage, setSelectedImage] = useState(user.avatar_url);
  const [phoneNumber, setPhoneNumber] = useState(user.phone ? user.phone : "0");

  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  console.log("🚀 / MyAccount / errors", errors);

  function handleSetImage(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      const imagePreviewUrl = reader.result.toString();

      setSelectedImage(imagePreviewUrl);
    };
    reader.readAsDataURL(file);

    setAvatarFile(file);
    toast({
      title: "Imagem carregada.",
      description: "Imagem carregada com sucesso.",
      status: "success",
      duration: 3000,
    });
  }

  async function onSubmit(data: FieldValues) {
    console.log("🚀 / onSubmit / data", data);

    await updatePersonalData({ name: data.name, email: data.email, phone: phoneNumber });

    if (avatarFile) {
      let dataForm = new FormData();
      dataForm.append("avatar", avatarFile, avatarFile.name);

      updateAvatar(dataForm);
    }
    toast({
      title: "Dados atualizados.",
      description: "Dados atualizados com sucesso.",
      status: "success",
      duration: 5000,
    });
  }
  useEffect(() => {
    setValue("phone", phoneNumber);
  }, [phoneNumber]);

  return (
    <Container>
      <Title>Minha conta</Title>

      <Card display="flex" padding="2rem 4rem">
        <ImageChangeArea>
          <AvatarLabel htmlFor="photo-upload" className="custom-file-upload fas">
            <ImgWarp>
              <Avatar size="2xl" src={selectedImage} />
            </ImgWarp>
            <LabelTest className="custom-file-upload">
              <Pencil size={24} />
              <input id="photo-upload" type="file" onChange={handleSetImage} />
            </LabelTest>
          </AvatarLabel>
        </ImageChangeArea>

        <h3>Dados Pessoais</h3>
        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <Label>Nome</Label>
            <Input type="text" {...register("name")} defaultValue={user.name} />
            {errors.name && <InputError message={errors.name.message} />}
          </LabelBox>

          <LabelBox>
            <Label>E-mail</Label>
            <Input type="email" {...register("email")} defaultValue={user.email} />
            {errors.email && <InputError message={errors.email.message} />}
          </LabelBox>

          <LabelBox>
            <Label>Número de telefone</Label>
            <MaskedInput
              mask="(00) 00000-0000"
              placeholder="Ex.: (11) 9-9999-9999"
              defaultValue={phoneNumber}
              onValueChange={(e) => setPhoneNumber(e)}
              {...register("phone")}
            />
            {errors.phone && <InputError message={errors.phone.message} />}
          </LabelBox>

          <Button type="submit">Salvar</Button>
        </form>
      </Card>
    </Container>
  );
}
