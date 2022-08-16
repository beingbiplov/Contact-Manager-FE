import React, { useEffect, useState } from "react";

import "./styles/dashboard.css";
import { verifyToken } from "../../services/userService";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { getContacts, getFavContacts } from "../../services/contactService";
import ContactInterface from "./interface/contactInterface";
import FavoriteSection from "./FavoriteSection";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ContactInterface[]>([]);
  const [favdata, setFavData] = useState<ContactInterface[]>([]);
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

  const getFavContactData = async () => {
    await getFavContacts()
      .then((data) => {
        setFavData(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadData = async () => {
    await verifyToken().then(() => {
      getContactData();
      getFavContactData();
    });
  };

  const handleReload = () => {
    setReload((current) => !current);
  };
  useEffect(() => {
    loadData();
  }, [reload]);

  return (
    <div>
      <div className="content-section">
        <AddContact reloadHandler={handleReload} />
        <div className="main-tables">
          <ContactList data={data} handler={handleReload} />
          <FavoriteSection data={favdata} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
