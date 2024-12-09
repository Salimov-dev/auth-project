import { Button, Flex, Form } from "antd";
import styled from "styled-components";

const Component = styled(Flex)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SubmitButtonRegisterForm = () => {
  return (
    <Form.Item label={null}>
      <Component>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Component>
    </Form.Item>
  );
};

export default SubmitButtonRegisterForm;
