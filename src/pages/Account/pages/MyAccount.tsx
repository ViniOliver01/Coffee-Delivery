import { Avatar, Spinner, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import heic2any from "heic2any";
import { Pencil } from "phosphor-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import FormError from "../../../components/Error/Form/FormError";
import Button from "../../../components/Form/Button/Button";
import { Input } from "../../../components/Form/Input/Input";
import { MaskedInput } from "../../../components/Form/Input/MaskedInput";
import Label from "../../../components/Form/Label/Label";
import { LabelBox } from "../../../components/Form/Label/LabelBox";
import { AuthContext } from "../../../context/AuthContext";
import Divider from "./../../../components/Divider/index";
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
  email: yup
    .string()
    .strict(true)
    .required("E-mail obrigatório")
    .email("Tipo de e-mail invalido"),
  phone: yup
    .string()
    .strict(true)
    .required("Número de telefone obrigatório")
    .length(11, "Número de telefone inválido"),
});

export default function MyAccount() {
  const { user, updatePersonalData, updateAvatar } = useContext(AuthContext);

  const [avatarFile, setAvatarFile] = useState<File>(null);
  const [selectedImage, setSelectedImage] = useState(user.avatar_url);
  const [isFetchingImg, setIsFetchingImg] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phone ? user.phone : "");

  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  async function handleSetImage(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const reader = new FileReader();
    var file = event.target.files[0];

    if (file.name.includes(".heic") || file.name.includes(".heif")) {
      setIsFetchingImg(true);
      await heic2any({
        blob: file,
        toType: "image/jpg",
        quality: 1,
      }).then(
        (blob) => {
          file = new File([blob as BlobPart], "photo.jpg", { type: "image/jpeg" });
        },
        (error) => {
          //handle errors
        }
      );
      setIsFetchingImg(false);
    }

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
    <>
      <Container>
        <Title>Minha conta</Title>
        <Card display="flex" padding="2rem 4rem">
          <ImageChangeArea>
            <AvatarLabel htmlFor="photo-upload" className="custom-file-upload fas">
              <ImgWarp>
                <Avatar size="2xl" src={isFetchingImg ? null : selectedImage} />
                {isFetchingImg && <Spinner thickness="4px" color="blue.500" size="xl" />}
              </ImgWarp>
              <LabelTest className="custom-file-upload">
                <Pencil size={24} />
                <input id="photo-upload" type="file" onChange={handleSetImage} />
              </LabelTest>
            </AvatarLabel>
          </ImageChangeArea>

          <h3>Dados Pessoais</h3>
          <Divider />

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <LabelBox>
              <Label>Nome</Label>
              <Input type="text" {...register("name")} defaultValue={user.name} />
              <FormError message={errors.name?.message} />
            </LabelBox>

            <LabelBox>
              <Label>E-mail</Label>
              <Input type="email" {...register("email")} defaultValue={user.email} />
              <FormError message={errors.email?.message} />
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
              <FormError message={errors.phone?.message} />
            </LabelBox>

            <Button type="submit">Salvar</Button>
          </form>
        </Card>
      </Container>
    </>
  );
}
