import useAuthStore from "@store/auth.store";
import { validateAndDecodeToken } from "@utils/token/validate-and-decode-token.util";
import { useEffect } from "react";

const AppLoader = ({ children }) => {
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const decodedToken = validateAndDecodeToken(accessToken);

    if (!decodedToken) {
      return;
    }

    useAuthStore.setState({ isAuth: true, authUser: decodedToken });
  }, [accessToken]);

  return children;
};

export default AppLoader;
