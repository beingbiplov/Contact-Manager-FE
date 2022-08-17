import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Typography, Button, message, Input, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../redux/store/store";
import { formItemLayout, tailFormItemLayout } from "../forms/common";
import { getUserById, updateUser } from "../../services/userService";
import { verifyToken } from "../../services/userService";
import { setUserNameToCookie } from "../../cookie/authCookie";
import { setUserName } from "../../redux/slice/userDataSlice";

const { Title } = Typography;

const UserUpdate: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userData = useSelector((state: RootState) => state.userData);
  const getUserFromDB = async () => {
    await getUserById(userData.id)
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 403) {
          message.error("You do not have access to this resource");
          navigate("/unauthorized");
        } else {
          message.error("Some error occurred. Please try again later");
          navigate("/");
        }
      });
  };

  useEffect(() => {
    verifyToken();
    getUserFromDB();
  }, []);

  const onSubmit = async (values: any) => {
    await verifyToken().then(async () => {
      if (data.id) {
        await updateUser(data.id, values)
          .then((res) => {
            setUserNameToCookie(res.data.data);
            dispatch(setUserName(res.data.data.name));
            message.success("User updated successfully", 3);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);

            const errMsg = "unexpected error occurred. Please try agin later!";
            message.error({
              content: errMsg,
              duration: 3,
            });
          });
      } else {
        message.success("Some error occurred. Please try agin later", 3);
        navigate(`/`);
      }
    });
  };

  if (data) {
    return (
      <div className="main-form-div">
        <Title className="container_title centered_text" level={4}>
          Update User Details : {data.email}
        </Title>
        <div className="container">
          <Form
            {...formItemLayout}
            form={form}
            name="update"
            onFinish={onSubmit}
            initialValues={{ name: data.name }}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="password" label="New Password" hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm New Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                className="primaryBtn mr-5"
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
              <Link to="/">
                <Button className="defaultBtn">Cancel</Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="contacts-load-screen">
          <Skeleton className="loading-skeleton" active />
        </div>
      </React.Fragment>
    );
  }
};

export default UserUpdate;
