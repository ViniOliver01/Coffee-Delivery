import { useMediaQuery, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button";

interface UserData {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export default function GoogleButton() {
  const toast = useToast();
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserData>();

  function warning() {
    toast({
      title: "Erro",
      description: "No momento o botão de login com o Google não está ativo",
      status: "error",
      duration: 10000,
      position: isMobile ? "top" : "bottom",
      isClosable: true,
    });
  }

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
  //   onError: () => {
  //     toast({
  //       title: "Erro",
  //       description: "Erro ao tentar fazer login.",
  //       status: "error",
  //       duration: 5000,
  //     });
  //   },
  // });

  // useEffect(() => {
  //   async function getGoogleData() {
  //     if (token) {
  //       try {
  //         const response = await axios.get(
  //           import.meta.env.VITE_GOOGLE_USER_INFO_URL + token
  //         );
  //         setUser(response.data);
  //       } catch (error) {
  //         console.warn("🚀 / error:", error);
  //       }
  //       try {
  //         const response = await axios.post(
  //           import.meta.env.VITE_GOOGLE_TOKEN_INFO_URL + token
  //         );
  //       } catch (error) {
  //         console.warn("🚀 / error:", error);
  //       }
  //     }
  //   }

  //   getGoogleData();
  // }, [token]);

  const [isMobile] = useMediaQuery("(max-width: 700px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <>
      <Button leftIcon={<FcGoogle size={24} />} color={"gray"} onClick={() => warning()}>
        Entrar com o google
      </Button>
    </>
  );
}
