import { Button, Flex, Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";

interface IProps {
  showModal: () => void;
}

const Component = styled(Flex)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthButtonHeader: FC<IProps> = ({ showModal }) => {
  return (
    <Component>
      <Typography.Text>Auth</Typography.Text>
      <Button color="danger" variant="outlined" onClick={showModal}>
        Вход
      </Button>
    </Component>
  );
};

export default AuthButtonHeader;
