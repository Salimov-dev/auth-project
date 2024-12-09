import { FC } from "react";
import type { FormInstance, FormProps } from "antd";
import { Button, Flex, Form, Input } from "antd";
import { ILogin } from "@interfaces/auth.interface";

interface IProps {
  form: FormInstance;
}

const LoginForm: FC<IProps> = ({ form }): JSX.Element => {
  const handleFinish: FormProps<ILogin>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete="off"
      style={{ margin: "20px 0 10px 0" }}
    >
      <Form.Item<ILogin>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ILogin>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Flex justify="center" style={{ marginTop: "30px" }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
