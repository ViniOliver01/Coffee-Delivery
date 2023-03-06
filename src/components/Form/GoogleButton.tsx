import { useToast } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
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

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao tentar fazer login.",
        status: "error",
        duration: 5000,
      });
    },
  });

  useEffect(() => {
    async function getGoogleData() {
      if (token) {
        try {
          const response = await axios.get(
            import.meta.env.VITE_GOOGLE_USER_INFO_URL + token
          );
          setUser(response.data);
        } catch (error) {
          console.warn("🚀 / error:", error);
        }
        try {
          const response = await axios.post(
            import.meta.env.VITE_GOOGLE_TOKEN_INFO_URL + token
          );
          console.log("🚀 / getGoogleData / response:", response);
        } catch (error) {
          console.warn("🚀 / error:", error);
        }
      }
    }

    getGoogleData();
  }, [token]);

  return (
    <>
      <Button leftIcon={<FcGoogle size={24} />} color={"gray"} onClick={() => login()}>
        Entrar com o google
      </Button>
    </>
  );
}
