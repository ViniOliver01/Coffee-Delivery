import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Pencil, Trash } from "phosphor-react";
import { useContext, useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import InputError from "../../../components/Error/Form/InputError";
import Button from "../../../components/Form/Button/Button";
import { Input } from "../../../components/Form/Input/Input";
import Label from "../../../components/Form/Label/Label";
import { ISpecListResponse } from "../../../context/ShoppingContext";
import { formatDate } from "../../../utils/format";
import { ShoppingContext } from "./../../../context/ShoppingContext";
import { SpecItem, SpecList } from "./StyledComponents";

const schema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
});

interface InputFormData {
  name: string;
}

export default function SpecsList() {
  const { updateSpecName, getSpecs, createSpec, deleteSpec } =
    useContext(ShoppingContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef(null);

  const [selectSpec, setSelectSpec] = useState<ISpecListResponse>();
  const [specs, setSpecs] = useState<ISpecListResponse[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  specs.sort((a, b) => a.name.localeCompare(b.name)); // sort by name

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

  async function handleOpenModal(index: number) {
    setConfirmModalIsOpen(false);
    setSelectSpec(specs[index]);
    clearErrors(["name"]);
    onOpen();
    setValue("name", specs[index].name);
  }

  async function handleNewSpecOpenModal() {
    setConfirmModalIsOpen(false);
    setSelectSpec(null);
    clearErrors(["name"]);
    setValue("name", "");
    onOpen();
  }

  async function handleDeleteSpecOpen(spec: ISpecListResponse) {
    setSelectSpec(spec);
    setConfirmModalIsOpen(true);
    onOpen();
  }

  async function handleDeleteSpecClose() {
    await deleteSpec(selectSpec.id);
    onClose();
    setRefresh(!refresh);
    toast({
      title: "Especificação excluída.",
      description: "Especificação excluída com sucesso.",
      status: "success",
      position: isMobile ? "top" : "bottom",
      duration: 5000,
    });
  }

  async function onSubmit(data: FieldValues) {
    const { name } = data;

    if (selectSpec) {
      const response = await updateSpecName({
        id: selectSpec.id,
        name,
      });

      if (response.status === 400) {
        toast({
          title: response.message,
          status: "error",
          position: isMobile ? "top" : "bottom",
          duration: 5000,
        });
      } else {
        toast({
          title: "Dados atualizados.",
          description: "Dados atualizados com sucesso.",
          status: "success",
          position: isMobile ? "top" : "bottom",
          duration: 5000,
        });
      }
    } else {
      const response = await createSpec(name);
      if (response.status === 400) {
        toast({
          title: response.message,
          status: "error",
          position: isMobile ? "top" : "bottom",
          duration: 5000,
        });
      } else {
        toast({
          title: "Especificação adicionada.",
          description: "Especificação adicionada com sucesso.",
          status: "success",
          position: isMobile ? "top" : "bottom",
          duration: 5000,
        });
      }
    }

    onClose();
    setRefresh(!refresh);
  }

  useEffect(() => {
    async function listSpecs() {
      const SpecList = await getSpecs();
      setSpecs(SpecList);
    }
    listSpecs();
  }, [refresh]);

  const [isMobile] = useMediaQuery("(max-width: 700px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <SpecList>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Especificação</ModalHeader>
          <ModalCloseButton />

          {confirmModalIsOpen ? (
            <>
              <ModalBody>
                <>
                  <h2>
                    Você tem certeza que deseja excluir a especificação:
                    <b> {selectSpec.name}</b>
                  </h2>
                </>
              </ModalBody>

              <ModalFooter gap={6}>
                <Button color="gray" onClick={onClose}>
                  Não
                </Button>
                <Button onClick={handleDeleteSpecClose} color="red">
                  Sim
                </Button>
              </ModalFooter>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <>
                  <Label>Nome da Especificação</Label>
                  <Input
                    type="text"
                    defaultValue={selectSpec && selectSpec.name}
                    ref={initialRef}
                    {...register("name")}
                  />

                  {errors.name && <InputError message={errors.name.message} />}
                </>
              </ModalBody>

              <ModalFooter gap={6}>
                <Button color="gray" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <div className="NewSpecButton">
        <Button onClick={handleNewSpecOpenModal}>Nova especificação</Button>
      </div>
      {specs.map((spec, index) => {
        return (
          <SpecItem key={spec.id}>
            <div>
              <h2>Nome</h2>
              <p>{spec.name}</p>
            </div>

            <div>
              <h2>Data de criação</h2>
              <p>{formatDate(spec.created_at)}</p>
            </div>

            <div>
              <h2>Data de atualização</h2>
              <p>{formatDate(spec.updated_at)}</p>
            </div>

            <Button onClick={() => handleDeleteSpecOpen(spec)} color="red">
              <Trash size={24} />
            </Button>
            <Button onClick={() => handleOpenModal(index)}>
              <Pencil size={24} />
            </Button>
          </SpecItem>
        );
      })}
    </SpecList>
  );
}
