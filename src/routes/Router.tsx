import { Center, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/Home/Home";
import { DefaultLayout } from "./../components/DefaultLayout/DefaultLayout";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export function Router() {
  const { signUp, isAuthenticated, isFetching } = useContext(AuthContext);
  console.log("🚀 / Router / isFetching", isFetching);
  console.log("🚀 / Router / isAuthenticated", isAuthenticated);

  if (isFetching) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.75s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />

        {isAuthenticated ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
