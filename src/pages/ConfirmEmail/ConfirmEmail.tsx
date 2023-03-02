import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Title } from "./styles";

export default function ConfirmEmail() {
  const { token } = useParams();
  const navigation = useNavigate();
  const { confirmEmail } = useContext(AuthContext);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function confirm() {
      setIsFetching(true);
      const response = await confirmEmail(token);

      if (response.status === 400) {
        navigation("/");
      }

      if (response.status === 200) {
        setTimeout(() => {
          navigation("/");
        }, 10000);
      }
    }
    confirm();
    setIsFetching(false);
  }, []);

  if (isFetching) {
    return <></>;
  }
  return (
    <>
      <Title>
        <h1>Email confirmado</h1>
        <p>Nós já confirmamos seu email, você será redirecionado em 10 segundos</p>
      </Title>
    </>
  );
}
