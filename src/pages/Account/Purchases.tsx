import { CheckCircle, Truck, WarningCircle } from "phosphor-react";
import styled from "styled-components";
import defaultTheme from "./../../styles/themes/Default";

const Card = styled.div`
  padding: 10px 20px;
  width: 100%;
  max-width: 630px;
  border-radius: 6px 44px 6px 44px;
  background-color: ${defaultTheme["base-card"]};
  gap: 0.5rem;
  margin: auto;

  h2 {
    margin-top: 0.5rem;
    color: ${defaultTheme["base-label"]};
    font-size: 1rem;

    a {
      color: ${defaultTheme.purple};
      font-size: 1rem;
    }
  }
`;

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  width: 100%;

  tr {
    background-color: ${defaultTheme.white};
    .Canceled,
    .Delivery,
    .PaymentAprove,
    .Finished {
      font-size: 1rem;
      font-family: "Baloo 2", cursive;
      font-weight: bold;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        gap: 0.2rem;
      }
    }

    .Canceled {
      color: red;
    }
    .Delivery {
      color: ${defaultTheme["base-text"]};
    }
    .PaymentAprove {
      color: green;
    }
    .Finished {
      color: green;
    }

    td {
      padding: 0.5rem 1rem;
      text-align: center;
    }
    th {
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      font-weight: bold;
      font-family: "Baloo 2", cursive;
    }
  }
  tr:first-child {
    th:first-child {
      border-radius: 44px 0 0 0;
    }
    th:last-child {
      border-radius: 0 44px 0 0;
    }
  }
  tr:last-child {
    td:first-child {
      border-radius: 0 0 0 44px;
    }
    td:last-child {
      border-radius: 0 0 44px 0;
    }
  }
`;

const purchasesList = [
  {
    id: 2858972802,
    date: "29/01/2023",
    totalValue: 1990,
    status: "Em transporte",
  },
  {
    id: 2201578149,
    date: "26/01/2023",
    totalValue: 1578,
    status: "Pagamento aprovado",
  },
  {
    id: 2506161734,
    date: "24/01/2023",
    totalValue: 990,
    status: "Cancelado",
  },
  {
    id: 1069311468,
    date: "22/01/2023",
    totalValue: 1245,
    status: "Concluído",
  },
];

export default function Purchases() {
  return (
    <Card>
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
          {purchasesList.map((p) => {
            const value = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(p.totalValue / 100);
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.date}</td>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
}
