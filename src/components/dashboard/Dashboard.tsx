import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import React, { useEffect } from "react";

import { verifyToken } from "../../services/userService";

const Dashboard: React.FC = () => {
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <Result
      icon={<SmileOutlined />}
      title="Work in progress!!"
      extra={
        <Button className="primaryBtn" type="primary">
          Next
        </Button>
      }
    />
  );
};

export default Dashboard;
