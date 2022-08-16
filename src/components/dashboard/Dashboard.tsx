import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";

import "./styles/dashboard.css";
import { verifyToken } from "../../services/userService";
import Navigation from "./Navigation";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { getContacts } from "../../services/contactService";
import ContactInterface from "./interface/contactInterface";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ContactInterface[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const getContactData = async () => {
    await getContacts()
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadData = async () => {
    await verifyToken().then(() => {
      getContactData();
    });
  };

  const handleReload = () => {
    setReload((current) => !current);
  };
  useEffect(() => {
    loadData();
  }, [reload]);

  if (data) {
    return (
      <div>
        <Navigation />
        <div className="content-section">
          <AddContact reloadHandler={handleReload} />
          <ContactList data={data} handler={handleReload} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation />
        <div className="contacts-load-screen">
          <Skeleton className="loading-skeleton" active />
          <Skeleton className="loading-skeleton" active />
          <Skeleton className="loading-skeleton" active />
        </div>
      </div>
    );
  }
};

export default Dashboard;
