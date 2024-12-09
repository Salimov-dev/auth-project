import { FC } from "react";
import { Form, FormInstance, FormProps, Input } from "antd";
import SubmitButtonRegisterForm from "./components/submit-button.register-form";
import { http } from "@services/http.service";
import { regexPatterns } from "@utils/regex/regex.utils";
import { handleHttpError } from "@utils/errors/handle-http.error";
import { IRegister } from "@interfaces/auth.interface";

interface IProps {
  form: FormInstance;
}

const RegisterForm: FC<IProps> = ({ form }): JSX.Element => {
  const handleFinish: FormProps<IRegister>["onFinish"] = async (values) => {
    try {
      await http.post("auth/register", values);
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка регистрации");
    }
  };

  return (
    <Form
      form={form}
      name="register"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete="off"
      style={{ margin: "20px 0 10px 0" }}
    >
      <Form.Item<IRegister>
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Введите свой псевдоним!" },
          {
            min: 3,
            max: 20,
            message: "Псевдоним должен быть длинной от 3 до 20 символов"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IRegister>
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Введите пароль!" },
          {
            min: 8,
            message: "Пароль должен содержать минимум 8 символов!"
          },
          {
            pattern: regexPatterns.PASSWORD,
            message:
              "Пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы"
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<IRegister>
        label="Repeat Password"
        name="repeatPassword"
        rules={[
          { required: true, message: "Повторите введенный пароль!" },
          {
            min: 8,
            message: "Пароль должен содержать минимум 8 символов!"
          },
          {
            pattern: regexPatterns.PASSWORD,
            message:
              "Повторный пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы"
          },
          {
            validator(_, value) {
              const password = form.getFieldValue("password");
              if (!value || password !== value) {
                return Promise.reject(
                  new Error("Введенные пароли не совпадают!")
                );
              }
            }
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<IRegister>
        label="First Name"
        name="firstName"
        rules={[
          { required: true, message: "Введите своё имя!" },
          {
            min: 3,
            max: 20,
            message: "Имя должно быть длинной от 2 до 20 символов"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IRegister>
        label="Last Name"
        name="lastName"
        rules={[
          { required: true, message: "Введите свою фамилию!" },
          {
            min: 3,
            max: 20,
            message: "Фамилия должна быть длинной от 2 до 20 символов"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IRegister>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Введите свою почту!" },
          {
            pattern: regexPatterns.EMAIL,
            message: "Введите почту корректно!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IRegister>
        label="Phone"
        name="phone"
        rules={[
          { required: true, message: "Введите свой телефон!" },
          {
            min: 3,
            max: 20,
            message: "Телефон должен быть длинной от 6 до 20 символов"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <SubmitButtonRegisterForm />
    </Form>
  );
};

export default RegisterForm;
