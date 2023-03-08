import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Title } from "./styles";

export default function ConfirmEmail() {
  const { token } = useParams();
  const navigation = useNavigate();
  const { confirmEmail } = useContext(AuthContext);

  const [isFetching, setIsFetching] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    async function confirm() {
      setIsFetching(true);
      const response = await confirmEmail(token);

      if (response.status === 400) {
        navigation("/");
      }

      if (response.status === 200) {
        let countdown = 10;
        const interval = setInterval(() => {
          if (countdown > 0) {
            countdown -= 1;
            setTimeLeft(countdown);
          } else {
            clearInterval(interval);
            navigation("/");
          }
        }, 1000);
        return () => clearInterval(interval);
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
        <p>
          Nós já confirmamos seu email, você será redirecionado em {timeLeft} segundos
        </p>
      </Title>
    </>
  );
}
