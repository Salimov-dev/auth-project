import { FC } from "react";
import { Button, Flex, Form, FormProps, Input } from "antd";
import { RegisterTypes } from "@interfaces/register.interface";

const RegisterForm: FC = (): JSX.Element => {
  const handleFinish: FormProps<RegisterTypes>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form
      name="register"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete="off"
      style={{ margin: "20px 0 10px 0" }}
    >
      <Form.Item<RegisterTypes>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="Repeat Password"
        name="passwordRepeat"
        rules={[{ required: true, message: "Please repeat your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterTypes>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Flex justify="center" style={{ marginTop: "30px" }}>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
