import { Layout, MenuProps, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AuthButtonHeader from "./components/auth-button.header";
import AuthPage from "@pages/auth.page";
import useAuthStore from "@store/auth.store";
import useUserStore from "@store/user.store";
import ProjectNameHeader from "./components/project-name.header";
import DropdownStyled from "@common/dropdown-styled";

const Component = styled(Layout.Header)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuth, authUser, logout } = useAuthStore();
  const { fetchUserById, selectedUser, isLoading } = useUserStore();

  const authUserId = authUser?.userId;
  const authUserFullName = !isLoading ? (
    `${selectedUser?.lastName} ${selectedUser?.firstName}`
  ) : (
    <Spin />
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Мой профиль"
    },
    {
      key: "2",
      label: "Заказы"
    },
    {
      type: "divider"
    },
    {
      key: "3",
      label: "Выйти",
      onClick: () => {
        Modal.confirm({
          title: "Выйти из системы?",
          okText: "Выйти",
          okType: "danger",
          cancelText: "Остаться",
          onOk: () => {
            logout();
          }
        });
      }
    }
  ];

  useEffect(() => {
    if (authUserId) {
      fetchUserById(authUserId);
    }
  }, [fetchUserById, authUserId]);

  return (
    <Component>
      <ProjectNameHeader />

      {!isAuth ? (
        <AuthButtonHeader showModal={showModal} />
      ) : (
        <DropdownStyled items={dropdownItems} title={authUserFullName} />
      )}

      <AuthPage isModalOpen={isModalOpen} cancelModal={cancelModal} />
    </Component>
  );
};

export default Header;
