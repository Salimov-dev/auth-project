import { FC } from "react";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input } from "antd";
import { LoginTypes } from "@interfaces/login.interface";

const LoginForm: FC = (): JSX.Element => {
  const handleFinish: FormProps<LoginTypes>["onFinish"] = (values) => {
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
      <Form.Item<LoginTypes>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginTypes>
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
