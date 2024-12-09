import { notification } from "antd";
import { AxiosError } from "axios";

export const handleHttpError = (
  error: unknown,
  defaultMessage = "Неизвестная ошибка"
) => {
  let errorMessage = defaultMessage;

  if (error instanceof AxiosError) {
    const responseErrorMessage = error.response.data.message;

    if (responseErrorMessage) {
      errorMessage = Array.isArray(responseErrorMessage)
        ? responseErrorMessage.join(", ")
        : responseErrorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  notification.error({
    message: defaultMessage,
    description: errorMessage
  });
};
