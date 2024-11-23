import { FC } from "react";
import { Modal, Segmented } from "antd";
import LoginForm from "@forms/login.form";
import RegisterForm from "@forms/register.form";
import { Segment } from "@interfaces/auth.interface";

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
      {segment === "login" ? <LoginForm /> : <RegisterForm />}
    </Modal>
  );
};

export default AuthPage;
