import { Menu, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/resized_logo.png";
import "./styles/navigation.css";
import { logoutUser } from "../../services/userService";
import { RootState } from "../../redux/store/store";

const Navigation: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userData);
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/user/update">Edit User Details</Link>,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: (
            <a
              onClick={() => {
                userLogout();
              }}
              href="#"
            >
              Logout
            </a>
          ),
          key: "1",
        },
      ]}
    />
  );
  const userLogout = () => {
    logoutUser();
  };
  return (
    <React.Fragment>
      <Menu mode="horizontal">
        <div className="navItem">
          <Link to="/">
            <img className="nav-logo" src={logo} alt="logo" />
          </Link>
          <div className="navItem-right">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <UserOutlined />
                  {userData.name}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Menu>
      <Outlet />
    </React.Fragment>
  );
};

export default Navigation;
