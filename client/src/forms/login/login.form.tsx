import { FC } from "react";
import type { FormInstance, FormProps } from "antd";
import { Form, Input } from "antd";
import { ILogin } from "@interfaces/auth.interface";
import SubmitButtonForm from "@common/buttons/submit-button.form";
import { httpService } from "@services/http.service";
import { handleHttpError } from "@utils/errors/handle-http.error";
import { jwtDecode } from "jwt-decode";

interface IProps {
  form: FormInstance;
}

const LoginForm: FC<IProps> = ({ form }): JSX.Element => {
  const handleFinish: FormProps<ILogin>["onFinish"] = (values) => {
    httpService
      .post("auth/login", values)
      .then(({ data }) => {
        const accessToken: string = data.accessToken;

        if (!accessToken) {
          throw new Error("Токены не найдены");
        }

        localStorage.setItem("token", accessToken);
        const decodedToken = jwtDecode(accessToken);
        console.log("decodedToken", decodedToken);
      })
      .catch((error: unknown) => {
        handleHttpError(error, "Ошибка при попытке входа");
      });
  };

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete="off"
      style={{ margin: "20px 0 10px 0" }}
    >
      <Form.Item<ILogin>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Введите свой псевдоним!" }]}
      >
        <Input autoComplete="username" />
      </Form.Item>

      <Form.Item<ILogin>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Введите пароль!" }]}
      >
        <Input.Password autoComplete="current-password" />
      </Form.Item>

      <SubmitButtonForm submitText="Войти" />
    </Form>
  );
};

export default LoginForm;
