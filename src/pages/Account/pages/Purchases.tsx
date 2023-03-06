import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckCircle, SmileySad, Truck, WarningCircle } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import Divider from "./../../../components/Divider/index";
import { UserContext } from "./../../../context/UserContext";
import { formatCurrency, formatDate } from "./../../../utils/format";
import { imgDefault } from "./../../../utils/imgDefault";
import {
  Card,
  Container,
  ModalCard,
  PurchaseItemCard,
  Table,
  Title,
} from "./../Components/StyledComponents";

interface ICartResponseProps {
  name: string;
  coffee_id: string;
  price: number;
  quantity: number;
  img_url: string;
}

interface IPurchasesResponse {
  id: string;
  purchase_id: number;
  user_id: string;
  created_at: Date;
  status: string;
  cart: ICartResponseProps[];
  total_value: number;
  products_value: number;
  delivery_value: number;
}

export default function Purchases() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getPurchases } = useContext(UserContext);
  const [purchasesList, setPurchasesList] = useState<IPurchasesResponse[]>([]);
  const [purchaseModal, setPurchaseModal] = useState<IPurchasesResponse>({
    cart: [],
    created_at: new Date(),
    total_value: 0,
    products_value: 0,
    delivery_value: 0,
    id: "",
    user_id: "",
    purchase_id: 0,
    status: "",
  });

  useEffect(() => {
    async function handleGet() {
      const data = await getPurchases();
      setPurchasesList(data);
    }
    handleGet();
  }, []);

  function handleOpenPurchase(purchase: IPurchasesResponse) {
    onOpen();
    setPurchaseModal(purchase);
  }

  return (
    <Container>
      <Title>Meus pedidos</Title>
      <Card display="flex" padding="2rem 4rem">
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />

            <ModalBody>
              <ModalCard>
                <p>
                  Número do pedido: <span>{purchaseModal.purchase_id}</span>
                </p>
                <p>
                  Data do pedido: <span>{formatDate(purchaseModal.created_at)}</span>
                </p>
                <p>
                  Status: <span>{purchaseModal.status}</span>
                </p>
                <Divider />
                {purchaseModal.cart.map((item) => {
                  item.img_url === null
                    ? (item.img_url = imgDefault({ type: "Coffee" }))
                    : item.img_url;

                  return (
                    <PurchaseItemCard key={item.coffee_id}>
                      <img src={item.img_url} alt="err" />

                      <div>
                        <h2>{item.name}</h2>
                        <p>Quantidade: {item.quantity}</p>
                      </div>

                      <span>{formatCurrency(item.price / 100)}</span>
                    </PurchaseItemCard>
                  );
                })}
                <footer>
                  <p>
                    Total Produto(s): {formatCurrency(purchaseModal.products_value / 100)}
                  </p>
                  <p>Frete: {formatCurrency(purchaseModal.delivery_value / 100)}</p>
                  <Divider />
                  <p>
                    Total do pedido: {formatCurrency(purchaseModal.total_value / 100)}
                  </p>
                </footer>
              </ModalCard>
            </ModalBody>

            {/* <ModalFooter>
              <button onClick={onClose}>Close</button>
              <button>Secondary Action</button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
        {purchasesList.length > 0 && (
          <Table>
            <thead>
              <tr>
                <th>Nº do pedido</th>
                <th>Data</th>
                <th>Valor total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {purchasesList.length > 0 &&
                purchasesList.map((p) => {
                  const value = formatCurrency(p.total_value / 100);

                  const date = formatDate(p.created_at);

                  return (
                    <tr key={p.id} onClick={() => handleOpenPurchase(p)}>
                      <td>{p.purchase_id}</td>
                      <td>{date}</td>
                      <td>{value}</td>
                      {p.status === "Concluído" && (
                        <td className="Finished">
                          <div>
                            <CheckCircle size={18} weight="bold" />
                            {p.status}
                          </div>
                        </td>
                      )}
                      {p.status === "Cancelado" && (
                        <td className="Canceled">
                          <div>
                            <WarningCircle size={18} weight="bold" />
                            {p.status}
                          </div>
                        </td>
                      )}
                      {p.status === "Pagamento aprovado" && (
                        <td className="PaymentAprove">
                          <div>
                            <CheckCircle size={18} weight="bold" />
                            {p.status}
                          </div>
                        </td>
                      )}
                      {p.status === "Em transporte" && (
                        <td className="Delivery">
                          <div>
                            <Truck size={18} weight="bold" />
                            {p.status}
                          </div>
                        </td>
                      )}
                      {p.status === "Pedido Realizado" && (
                        <td className="Delivery">
                          <div>{p.status}</div>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
        {purchasesList.length === 0 && (
          <>
            <p>Nenhum pedido encontrado </p> <SmileySad size={32} />
          </>
        )}
      </Card>
    </Container>
  );
}
