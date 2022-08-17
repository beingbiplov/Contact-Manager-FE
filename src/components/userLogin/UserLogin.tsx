import React from "react";
import { Link } from "react-router-dom";
import { Form, Typography, Button, message } from "antd";
import { useDispatch } from "react-redux";

import "./styles/userLogin.css";
import UserLoginForm from "../forms/UserLoginForm";
import { tailFormItemLayout } from "../forms/common";
import logo from "../../assets/logo.png";
import { loginUser } from "../../services/userService";
import { setUserAuthState } from "../../redux/slice/userAuthenticationSlice";
import { setUserData } from "../../redux/slice/userDataSlice";
import { setCookieOnLogin } from "../../cookie/authCookie";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    const data = { email: values.email, password: values.password };
    await loginUser(data)
      .then((data) => {
        setCookieOnLogin(data.data);
        dispatch(setUserAuthState(true));
        dispatch(setUserData(data.data.data.userData));
        message.success("User logged in successfully.", 5);
        navigate("/");
      })
      .catch((err) => {
        const errMsg =
          err.response.status === 401
            ? err.response.data.message
            : "unexpected error occurred. Please try agin later!";
        message.error({
          content: errMsg,
          style: {
            marginTop: "13%",
          },
          duration: 5,
        });
      });
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
