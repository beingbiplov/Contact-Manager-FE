import React from "react";
import { Form, Typography, Button, message } from "antd";

import "./styles/userRegistration.css";
import UserRegistrationForm from "../forms/UserRegistrationForm";
import { formItemLayout, tailFormItemLayout } from "../forms/common";
import { registerUser } from "../../services/userService";

const { Title } = Typography;

const UserRegistration: React.FC = () => {
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    await registerUser(values)
      .then(() => {
        message.success(
          "User registered successfully. Please log in to continue.",
          5
        );
      })
      .catch((err) => {
        const errMsg =
          err.response.status === 409
            ? err.response.data.message
            : "unexpected error occurred. Please try agin later!";
        message.error({
          content: errMsg,
          style: {
            marginTop: "8%",
          },
          duration: 5,
        });
      });
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
          onFinish={onSubmit}
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
