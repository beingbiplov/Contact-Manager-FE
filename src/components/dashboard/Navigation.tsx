import { Menu } from "antd";
import React from "react";

import logo from "../../assets/resized_logo.png";
import "./styles/navigation.css";
import { logoutUser } from "../../services/userService";
import { Link, Outlet } from "react-router-dom";

const Navigation: React.FC = () => {
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
            <a
              onClick={() => {
                userLogout();
              }}
              href="#"
            >
              {" "}
              Logout
            </a>
          </div>
        </div>
      </Menu>
      <Outlet />
    </React.Fragment>
  );
};

export default Navigation;
