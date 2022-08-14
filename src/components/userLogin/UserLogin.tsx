import React from "react";
import { Link } from "react-router-dom";
import { Form, Typography, Button } from "antd";

import "./styles/userLogin.css";
import UserLoginForm from "../forms/UserLoginForm";
import { tailFormItemLayout } from "../forms/common";
import logo from "../../assets/logo.png";

const { Title } = Typography;

const UserLogin: React.FC = () => {
  const onSubmit = async (values: any) => {
    console.log(values);
  };
  const onSubmitFail = async (values: any) => {
    console.log(values);
  };
  return (
    <div className="main-form-div">
      <div className="login-logo centered_text">
        <img src={logo} alt="logo" />
      </div>
      <Title className="login-container_title centered_text" level={4}>
        Log in to access your contacts.
      </Title>
      <div className="container">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onSubmitFail}
          autoComplete="off"
        >
          <UserLoginForm />
          <Form.Item {...tailFormItemLayout}>
            <Button
              className="primaryBtn mr-5"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
            <Link to="/register">
              <Button className="defaultBtn">Register</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserLogin;
