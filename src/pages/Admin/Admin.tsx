import { useState } from "react";
import CoffeeList from "./components/CoffeeList";
import SpecsList from "./components/SpecsList";
import { Container } from "./components/StyledComponents";

export default function Admin() {
  const [tabSelect, setTabSelect] = useState("Coffee");

  return (
    <Container>
      <nav>
        <button
          onClick={() => setTabSelect("Coffee")}
          className={tabSelect === "Coffee" ? "active" : null}
        >
          Cafés
        </button>
        <button
          onClick={() => setTabSelect("Spec")}
          className={tabSelect === "Spec" ? "active" : null}
        >
          Especificações
        </button>
      </nav>
      {tabSelect === "Coffee" ? <CoffeeList /> : <SpecsList />}
    </Container>
  );
}
