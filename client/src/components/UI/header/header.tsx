import { Layout } from "antd";
import { useState } from "react";
import styled from "styled-components";
import AuthButtonHeader from "./components/auth-button.header";
import { Segment } from "@interfaces/auth.interface";
import AuthPage from "@pages/auth.page";

const Component = styled(Layout.Header)`
  text-align: center;
  color: #fff;
  height: 64;
  padding-inline: 48;
  line-height: 64px;
  background-color: #4096ff;
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segment, setSegment] = useState<Segment>("login");

  const handleChangeSegment = (value: Segment) => {
    setSegment(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Component>
      <AuthButtonHeader showModal={showModal} />

      <AuthPage
        segment={segment}
        isModalOpen={isModalOpen}
        cancelModal={cancelModal}
        onChangeSegment={handleChangeSegment}
      />
    </Component>
  );
};

export default Header;
