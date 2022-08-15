import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import React, { useEffect } from "react";

import { verifyToken } from "../../services/userService";
import Navigation from "./Navigation";
import ContactCard from "./ContactCard";

const Dashboard: React.FC = () => {
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div>
      <Navigation />
      <div className="content-section">
        <ContactCard />
      </div>
    </div>
  );
};

export default Dashboard;
