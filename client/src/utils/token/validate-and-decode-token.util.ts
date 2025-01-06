import { IAccessDecodedToken } from "@interfaces/auth.interface";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export const validateAndDecodeToken = (accessToken: string) => {
  if (!accessToken) {
    return null;
  }

  const decodedToken: IAccessDecodedToken = jwtDecode(accessToken);

  const today = dayjs();
  const expDate = dayjs(decodedToken.exp);
  const isExpired = expDate.isBefore(today);

  if (!isExpired) {
    return null;
  }

  delete decodedToken.exp;
  delete decodedToken.iat;

  return decodedToken;
};
