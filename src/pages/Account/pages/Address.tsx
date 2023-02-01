import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";

import InputError from "../../../components/Error/Form/InputError";
import { Button } from "../../../components/Form/Button";
import { Input } from "../../../components/Form/Input";
import Label from "../../../components/Form/Label";
import { LabelBox } from "../../../components/Form/LabelBox";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AddressBox,
  AddressCard,
  Card,
  Container,
  Title,
} from "../Components/StyledComponents";

const addressList = [
  {
    id: "369329994",
    name: "Home",
    street: "Rua Oliveira Agostinho Pinto",
    number: 141,
    city: "Iperó",
    state: "SP",
    cep: "18560-000",
  },
  {
    id: "3551412763",
    name: "Home",
    street: "Rua Oliveira Agostinho Pinto",
    number: 141,
    city: "Iperó",
    state: "SP",
    cep: "18560-000",
  },
  {
    id: "1944062608",
    name: "Home",
    street: "Rua Oliveira Agostinho Pinto",
    number: 141,
    city: "Iperó",
    state: "SP",
    cep: "18560-000",
  },
];

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  console.log("🚀 / Login / errors", errors);

  async function onSubmit(data: FieldValues) {
    console.log(data);

    // if (response.status === 400) {
    //   setErrors(response.message);
    // }
    // setErrors("Senha invalida");
    onClose();
  }

  // return (
  //   <Card>
  //     <Spinner color="purple.500" size="xl" />
  //   </Card>
  // );

  return (
    <Container>
      <Title>Endereços de entrega</Title>
      <Card display="grid" padding="20px 30px">
        {addressList.map((address) => {
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
                <a onClick={onOpen}>Editar</a>
              </div>
              {/* <Button onClick={onOpen}>Open Modal</Button> */}

              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                  {/* <ModalHeader>Modal Title</ModalHeader> */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                      <AddressBox>
                        <LabelBox id="nomeEndereco">
                          <Label>Nome do endereço</Label>
                          <Input
                            type="text"
                            {...register("addressName")}
                            value={address.name}
                          />
                          {errors.addressName && (
                            <InputError message={errors.addressName.message} />
                          )}
                        </LabelBox>

                        <LabelBox id="cep">
                          <Label>Cep</Label>
                          <Input type="text" {...register("cep")} value={address.cep} />
                          {errors.cep && <InputError message={errors.cep.message} />}
                        </LabelBox>

                        <LabelBox id="cidade">
                          <Label>Cidade</Label>
                          <Input type="text" {...register("city")} value={address.city} />
                          {errors.city && <InputError message={errors.city.message} />}
                        </LabelBox>

                        <LabelBox id="estado">
                          <Label>Estado</Label>
                          <Input
                            type="text"
                            {...register("state")}
                            value={address.state}
                          />
                          {errors.state && <InputError message={errors.state.message} />}
                        </LabelBox>

                        <LabelBox id="rua">
                          <Label>Rua</Label>
                          <Input
                            type="text"
                            {...register("street")}
                            value={address.street}
                          />
                          {errors.street && (
                            <InputError message={errors.street.message} />
                          )}
                        </LabelBox>

                        <LabelBox id="numero">
                          <Label>Número</Label>
                          <Input
                            type="text"
                            {...register("number")}
                            value={address.number}
                          />
                          {errors.number && (
                            <InputError message={errors.number.message} />
                          )}
                        </LabelBox>

                        <LabelBox id="complemento">
                          <Label opcional>Complemento</Label>
                          <Input type="text" {...register("complement")} />
                          {errors.complement && (
                            <InputError message={errors.complement.message} />
                          )}
                        </LabelBox>
                      </AddressBox>
                    </ModalBody>

                    <ModalFooter gap={4}>
                      <Button>Cancelar</Button>
                      <Button login type="submit">
                        Salvar
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            </AddressCard>
          );
        })}
      </Card>
    </Container>
  );
}
