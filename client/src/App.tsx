import { Layout } from "antd";
import "./styles/reset.css";
import styled from "styled-components";
import Header from "@UI/header/header";
import Content from "@UI/content/content";
import Footer from "@UI/footer/footer";
import useAuthStore from "@store/auth.store";

const Component = styled(Layout)`
  width: 100%;
  height: 100vh;
`;

function App() {
  console.log("useAuthStore()", useAuthStore());

  return (
    <Component>
      <Header />
      <Content />
      <Footer />
    </Component>
  );
}

export default App;
