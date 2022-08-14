import React from "react";
import { Form, Typography, Button } from "antd";

import "./styles/userRegistration.css";
import UserRegistrationForm from "../forms/UserRegistrationForm";
import { formItemLayout, tailFormItemLayout } from "../forms/common";

const { Title } = Typography;

const UserRegistration: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <Title className="container_title centered_text" level={4}>
        Create Account{" "}
      </Title>
      <div className="container">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <UserRegistrationForm />
          <Form.Item {...tailFormItemLayout}>
            <Button
              className="primaryBtn mr-5"
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
            <Button className="defaultBtn">Log In</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserRegistration;
