import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { IAddressesResponse, UserContext } from "../../../context/UserContext";

import { Plus, SmileySad, Trash } from "phosphor-react";
import { Input } from "../../../components/Form/Input/Input";
import Label from "../../../components/Form/Label/Label";
import { LabelBox } from "../../../components/Form/Label/LabelBox";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import FormError from "../../../components/Error/Form/FormError";
import Button from "../../../components/Form/Button/Button";
import {
  AddressBox,
  AddressCard,
  AddressCardList,
  Card,
  Container,
  Title,
} from "../Components/StyledComponents";

interface InputFormData {
  addressName: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  complement?: string;
}

const schema = yup.object().shape({
  addressName: yup.string().strict(true).required("Nome do endereço obrigatório"),
  cep: yup.string().strict(true).required("Cep obrigatório"),
  city: yup.string().strict(true).required("Cidade obrigatório"),
  state: yup.string().strict(true).required("Estado obrigatório"),
  street: yup.string().strict(true).required("Rua obrigatório"),
  number: yup.string().strict(true).required("Número obrigatório"),
  complement: yup.string(),
});

export default function Address() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { getAddresses, createAddress, updateAddress, deleteAddress } =
    useContext(UserContext);
  const [addressList, setAddressList] = useState<IAddressesResponse[]>([]);
  const [addressId, setAddressId] = useState("");
  const [update, setUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FieldValues) {
    if (addressId) {
      const { cep, city, state, street, number, complement } = data;
      const response = await updateAddress({
        id: addressId,
        name: data.addressName,
        cep,
        city,
        state,
        street,
        number,
        complement,
      });
      toast({
        title: "Endereço Atualizado",
        status: "success",
        position: isMobile ? "top" : "bottom",
        duration: 10000,
      });
    }
    if (!addressId) {
      const { cep, city, state, street, number, complement } = data;
      const response = await createAddress({
        name: data.addressName,
        cep,
        city,
        state,
        street,
        number,
        complement,
      });
      toast({
        title: "Endereço criado",
        status: "success",
        position: isMobile ? "top" : "bottom",
        duration: 10000,
      });
    }

    setUpdate(!update);
    onClose();
  }

  async function handleAddNewAddress() {
    setAddressId("");
    clearErrors([
      "addressName",
      "cep",
      "city",
      "complement",
      "number",
      "state",
      "street",
    ]);
    onOpen();
    setValue("addressName", "");
    setValue("cep", "");
    setValue("city", "");
    setValue("complement", "");
    setValue("number", "");
    setValue("state", "");
    setValue("street", "");
  }

  async function handleOpenExistentAddress(index: number) {
    setAddressId(addressList[index].id);
    clearErrors([
      "addressName",
      "cep",
      "city",
      "complement",
      "number",
      "state",
      "street",
    ]);
    onOpen();
    setValue("addressName", addressList[index].name);
    setValue("cep", addressList[index].cep);
    setValue("city", addressList[index].city);
    setValue("complement", addressList[index].complement);
    setValue("number", addressList[index].number);
    setValue("state", addressList[index].state);
    setValue("street", addressList[index].street);
  }

  async function handleDeleteAddress(id: string) {
    await deleteAddress(id);
    setUpdate(!update);
  }

  useEffect(() => {
    async function handleGet() {
      const data = await getAddresses();

      setAddressList(data);
    }
    handleGet();
  }, [update]);

  const [isMobile] = useMediaQuery("(max-width: 700px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Container>
      <Title>Endereços de entrega</Title>

      <Card display="flex" padding="20px 30px">
        <AddressCardList>
          {addressList.map((address, index) => {
            return (
              <AddressCard key={address.id}>
                <h2>{address.name}</h2>
                <p>
                  {address.street}, {address.number}
                </p>
                <p>
                  {address.city} - {address.state}, CEP: {address.cep}
                </p>
                <div>
                  <a onClick={() => handleOpenExistentAddress(index)}>Editar</a>
                  <Button onClick={() => handleDeleteAddress(address.id)} color="red">
                    <Trash size={20} />
                  </Button>
                </div>
              </AddressCard>
            );
          })}
        </AddressCardList>
        {addressList.length === 0 && (
          <>
            <p>Nenhum endereço encontrado</p>
            <SmileySad size={32} />
          </>
        )}
        <div>
          <Button onClick={handleAddNewAddress} leftIcon={<Plus weight="bold" />}>
            <p>Novo endereço</p>
          </Button>
        </div>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <AddressBox>
                <LabelBox id="nomeEndereco">
                  <Label>Nome do endereço</Label>
                  <Input
                    type="text"
                    {...register("addressName")}
                    error={!!errors.addressName}
                  />
                  <FormError message={errors.addressName?.message} />
                </LabelBox>

                <LabelBox id="cep">
                  <Label>Cep</Label>
                  <Input type="text" {...register("cep")} error={!!errors.cep} />
                  <FormError message={errors.cep?.message} />
                </LabelBox>

                <LabelBox id="cidade">
                  <Label>Cidade</Label>
                  <Input type="text" {...register("city")} error={!!errors.city} />
                  <FormError message={errors.city?.message} />
                </LabelBox>

                <LabelBox id="estado">
                  <Label>Estado</Label>
                  <Input type="text" {...register("state")} error={!!errors.state} />
                  <FormError message={errors.state?.message} />
                </LabelBox>

                <LabelBox id="rua">
                  <Label>Rua</Label>
                  <Input type="text" {...register("street")} error={!!errors.street} />
                  <FormError message={errors.street?.message} />
                </LabelBox>

                <LabelBox id="numero">
                  <Label>Número</Label>
                  <Input type="text" {...register("number")} error={!!errors.number} />
                  <FormError message={errors.number?.message} />
                </LabelBox>

                <LabelBox id="complemento">
                  <Label opcional>Complemento</Label>
                  <Input
                    type="text"
                    {...register("complement")}
                    error={!!errors.complement}
                  />
                  <FormError message={errors.complement?.message} />
                </LabelBox>
              </AddressBox>
            </ModalBody>

            <ModalFooter gap={4}>
              <Button onClick={onClose}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
}
