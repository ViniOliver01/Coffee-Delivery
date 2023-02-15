import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { AdminCoffeeModal, LabelInput } from "./../components/StyledComponents";

import { Pencil, Trash, WarningCircle } from "phosphor-react";
import InputError from "../../../components/Error/Form/InputError";
import { Input } from "../../../components/Form/Input";
import Label from "../../../components/Form/Label";
import { LabelBox } from "../../../components/Form/LabelBox";
import { TextArea } from "../../../components/Form/TextArea";
import {
  Coffee,
  ICoffeeListResponse,
  ShoppingContext,
} from "../../../context/ShoppingContext";
import { formatCurrency } from "../../../utils/format";
import Button from "./../../../components/Form/Button";
import { AdminCoffeeItem, CoffeeListItem } from "./StyledComponents";

const schema = yup.object().shape({
  name: yup.string().strict(true).required("Nome obrigatório"),
  description: yup.string().strict(true).required("Descrição obrigatória"),
  available: yup.boolean().strict(true).required("Disponibilidade obrigatória"),
  // specs: yup.string().strict(true).required("Especificações obrigatórias"),
  price: yup.number().required("Preço obrigatório"),
});

interface InputFormData {
  name: string;
  description: string;
  available: boolean;
  // specs: string;
  price: number;
}

export default function CoffeeList() {
  const { getCoffees, updateCoffeeImage, updateCoffeeData, deleteCoffee, createCoffee } =
    useContext(ShoppingContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [selectCoffee, setSelectCoffee] = useState<ICoffeeListResponse>();
  const [coffeeFile, setCoffeeFile] = useState<File>(null);
  const [coffees, setCoffees] = useState<ICoffeeListResponse[]>([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  coffees.sort((a, b) => a.name.localeCompare(b.name));

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
  // console.log("🚀 / CoffeeList / errors", errors);

  async function handleOpenModal(coffee_id: string) {
    setConfirmModalIsOpen(false);
    const coffee = coffees.filter((coffee) => coffee.id === coffee_id);

    onOpen();
    setSelectCoffee(coffee[0]);
    setSelectedImage(coffee[0].image_url);
    clearErrors(["name", "description", "available", "price"]);
    setValue("name", coffee[0].name);
    setValue("description", coffee[0].description);
    setValue("available", coffee[0].available);
    // setValue("price", coffee[0].price / 100);
    setPrice(coffee[0].price / 100);

    // setValue("specs", coffees[index].specifications[0].name);
  }

  function handleSetImage(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    console.log("🚀 / handleSetImage / file", file);

    reader.onloadend = () => {
      const imagePreviewUrl = reader.result.toString();

      setSelectedImage(imagePreviewUrl);
    };
    reader.readAsDataURL(file);

    setCoffeeFile(file);
    toast({
      title: "Imagem carregada.",
      description: "Imagem carregada com sucesso.",
      status: "success",
      duration: 3000,
    });
  }

  async function handleNewCoffeeOpenModal() {
    setConfirmModalIsOpen(false);
    setSelectedImage(null);
    setSelectCoffee(null);
    onOpen();
    clearErrors(["name", "description", "available", "price"]);
    setValue("name", "");
    setValue("description", "");
    setValue("available", true);
    // setValue("price", coffee[0].price / 100);
    setPrice(0);
  }

  async function handleDeleteCoffeeOpen(spec: ICoffeeListResponse) {
    setSelectCoffee(spec);
    setConfirmModalIsOpen(true);
    onOpen();
  }

  async function handleDeleteCoffeeClose() {
    await deleteCoffee(selectCoffee.id);
    onClose();
    setRefresh(!refresh);
    toast({
      title: "Café excluído.",
      description: "Café excluído com sucesso.",
      status: "success",
      duration: 5000,
    });
  }

  async function onSubmit(data: FieldValues) {
    const { name, description, price, available } = data;
    var coffee: Coffee;

    if (selectCoffee) {
      await updateCoffeeData({
        id: selectCoffee.id,
        name,
        available,
        description,
        price: price * 100,
      });
      toast({
        title: "Dados atualizados.",
        description: "Dados atualizados com sucesso.",
        status: "success",
        duration: 5000,
      });
    } else {
      coffee = await createCoffee({
        name,
        description,
        price: price * 100,
      });
      toast({
        title: "Café adicionado",
        description: "Café adicionado com sucesso.",
        status: "success",
        duration: 5000,
      });
    }

    if (coffeeFile) {
      let dataForm = new FormData();
      dataForm.append("coffee", coffeeFile, coffeeFile.name);

      if (selectCoffee) {
        await updateCoffeeImage(selectCoffee.id, dataForm);
      } else {
        await updateCoffeeImage(coffee.id, dataForm);
      }
    }
    onClose();
    setRefresh(!refresh);
  }

  useEffect(() => {
    async function listCoffees() {
      const coffeeList = await getCoffees();
      setCoffees(coffeeList);
    }
    listCoffees();
  }, [refresh]);

  const [price, setPrice] = useState(0);

  return (
    <CoffeeListItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Café</ModalHeader>
          <ModalCloseButton />
          {confirmModalIsOpen ? (
            <>
              <ModalBody>
                <>
                  <h2>
                    Você tem certeza que deseja excluir a especificação:
                    <b> {selectCoffee.name}</b>
                  </h2>
                </>
              </ModalBody>

              <ModalFooter gap={6}>
                <Button color="gray" onClick={onClose}>
                  Não
                </Button>
                <Button onClick={handleDeleteCoffeeClose} color="red">
                  Sim
                </Button>
              </ModalFooter>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <AdminCoffeeModal>
                  <div className="noImageFound">
                    <LabelInput className="custom-file-upload">
                      {selectedImage !== null ? (
                        <img src={selectedImage} alt="" width={96} />
                      ) : (
                        <>
                          <WarningCircle size={32} className="error" />
                          <p>No image found</p>{" "}
                        </>
                      )}
                      <input id="photo-upload" type="file" onChange={handleSetImage} />
                    </LabelInput>
                  </div>

                  <LabelBox id="name">
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      {...register("name")}
                      defaultValue={selectCoffee && selectCoffee.name}
                    />
                    {errors.name && <InputError message={errors.name.message} />}
                  </LabelBox>

                  <LabelBox id="description">
                    <Label>Descrição</Label>
                    <TextArea
                      rows={3}
                      cols={30}
                      {...register("description")}
                      defaultValue={selectCoffee && selectCoffee.description}
                    />
                    {errors.description && (
                      <InputError message={errors.description.message} />
                    )}
                  </LabelBox>

                  <LabelBox id="available">
                    <Label>Disponível?</Label>
                    <Switch
                      size="lg"
                      {...register("available")}
                      defaultChecked={selectCoffee && selectCoffee.available}
                    />
                    {errors.available && (
                      <InputError message={errors.available.message} />
                    )}
                  </LabelBox>

                  <div>
                    <h2>Especificações</h2>
                    {selectCoffee && selectCoffee.specifications
                      ? selectCoffee.specifications.map((specification) => {
                          return (
                            <span className="tag" key={specification.id}>
                              {specification.name}
                            </span>
                          );
                        })
                      : null}
                  </div>

                  <LabelBox id="price">
                    <Label>Preço</Label>
                    <Input
                      type="text"
                      value={price}
                      {...register("price", {
                        onChange: (e) => setPrice(e.target.value),
                      })}
                    />
                    {errors.price && <InputError message={errors.price.message} />}
                  </LabelBox>
                </AdminCoffeeModal>
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

      <div className="NewCoffeeButton">
        <Button onClick={handleNewCoffeeOpenModal}>Adicionar Café</Button>
      </div>

      {coffees.length !== 0 ? (
        coffees.map((coffee) => {
          return (
            <AdminCoffeeItem key={coffee.id}>
              {coffee.image_url ? (
                <div>
                  <img src={coffee.image_url} alt="" width={96} />
                </div>
              ) : (
                <div className="noImageFound">
                  <WarningCircle size={32} className="error" />
                  <p>No image found</p>
                </div>
              )}

              <div>
                <h2>Nome</h2>
                <p>{coffee.name}</p>
              </div>

              <div>
                <h2>Descrição</h2>
                <p>{coffee.description}</p>
              </div>

              <div>
                <h2>Disponível?</h2>
                <p></p>
                {coffee.available ? (
                  <span className="success">Sim</span>
                ) : (
                  <span className="error">Não</span>
                )}
              </div>

              <div>
                <h2>Especificações</h2>

                {coffee.specifications
                  ? coffee.specifications.map((specification) => {
                      return (
                        <span className="tag" key={specification.id}>
                          {specification.name}
                        </span>
                      );
                    })
                  : null}
              </div>

              <div>
                <h2>Preço</h2>
                <p>{formatCurrency(coffee.price / 100)}</p>
              </div>

              <Button onClick={() => handleDeleteCoffeeOpen(coffee)} color="red">
                <Trash size={24} />
              </Button>

              <Button onClick={() => handleOpenModal(coffee.id)}>
                <Pencil size={24} />
              </Button>
            </AdminCoffeeItem>
          );
        })
      ) : (
        <Center>
          <Spinner size="xl" />
        </Center>
      )}
    </CoffeeListItem>
  );
}
