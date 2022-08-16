import { Menu } from "antd";

import logo from "../../assets/resized_logo.png";
import "./styles/navigation.css";
import { logoutUser } from "../../services/userService";

const Navigation: React.FC = () => {
  const userLogout = () => {
    logoutUser();
  };
  return (
    <Menu mode="horizontal">
      <div className="navItem">
        <img className="nav-logo" src={logo} alt="logo" />
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
  );
};

export default Navigation;
