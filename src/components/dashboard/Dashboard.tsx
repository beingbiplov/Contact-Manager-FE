import React, { useEffect } from "react";

import { verifyToken } from "../../services/userService";
import Navigation from "./Navigation";
import ContactCard from "./ContactCard";
import AddContact from "./AddContact";

const Dashboard: React.FC = () => {
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div>
      <Navigation />
      <div className="content-section">
        <AddContact />
        <ContactCard />
      </div>
    </div>
  );
};

export default Dashboard;
