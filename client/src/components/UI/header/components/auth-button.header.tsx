import { Button } from "antd";
import { FC } from "react";

interface IProps {
  showModal: () => void;
}

const AuthButtonHeader: FC<IProps> = ({ showModal }) => {
  return (
    <Button color="danger" variant="outlined" onClick={showModal}>
      Вход
    </Button>
  );
};

export default AuthButtonHeader;
