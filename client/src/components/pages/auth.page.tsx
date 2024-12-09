import { FC } from "react";
import { Modal, Segmented } from "antd";
import LoginForm from "@forms/login/login.form";
import RegisterForm from "@forms/register/register.form";
import { Segment } from "@interfaces/auth.interface";
import { useForm } from "antd/es/form/Form";

const options = [
  { label: "ВОЙТИ", value: "login" },
  { label: "РЕГИСТРАЦИЯ", value: "register" }
];

interface IProps {
  segment: Segment;
  isModalOpen: boolean;
  cancelModal: () => void;
  onChangeSegment: (value: Segment) => void;
}

const AuthPage: FC<IProps> = ({
  segment,
  isModalOpen,
  cancelModal,
  onChangeSegment
}) => {
  const [form] = useForm();

  return (
    <Modal
      title="Авторизация"
      open={isModalOpen}
      footer={false}
      width="400px"
      onCancel={cancelModal}
    >
      <Segmented
        options={options}
        block
        onChange={(value) => onChangeSegment(value as Segment)}
      />
      {segment === "login" ? (
        <LoginForm form={form} />
      ) : (
        <RegisterForm form={form} />
      )}
    </Modal>
  );
};

export default AuthPage;
