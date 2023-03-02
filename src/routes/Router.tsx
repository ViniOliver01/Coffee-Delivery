import { Center, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ConfirmEmail from "../pages/ConfirmEmail/ConfirmEmail";
import Home from "../pages/Home/Home";
import { DefaultLayout } from "./../components/DefaultLayout/DefaultLayout";
import { AdminRoutes } from "./AdminRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export function Router() {
  const { isAuthenticated, isFetching, isFetchingAdmin, isAdmin } =
    useContext(AuthContext);

  if (isFetching && isFetchingAdmin) {
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
        <Route path="confirmemail/:token" element={<ConfirmEmail />} />

        {isAdmin && <Route path="/*" element={<AdminRoutes />} />}
        {isAuthenticated && <Route path="/*" element={<PrivateRoutes />} />}
        <Route path="/*" element={<PublicRoutes />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
