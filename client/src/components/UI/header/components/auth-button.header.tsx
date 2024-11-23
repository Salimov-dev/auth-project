import { Button, Flex, Typography } from "antd";
import { FC } from "react";

interface IProps {
  showModal: () => void;
}

const AuthButtonHeader: FC<IProps> = ({ showModal }) => {
  return (
    <Flex align="center" justify="space-between" style={{ height: "100%" }}>
      <Typography.Text>Auth</Typography.Text>
      <Button color="danger" variant="outlined" onClick={showModal}>
        Вход
      </Button>
    </Flex>
  );
};

export default AuthButtonHeader;
