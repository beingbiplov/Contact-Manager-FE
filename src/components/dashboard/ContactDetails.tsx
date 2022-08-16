import { Button, Modal, message, Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ContactCard from "./ContactCard";
import "./styles/common.css";
import { verifyToken } from "../../services/userService";
import ContactInterface, { contactIdProps } from "./interface/contactInterface";
import { getContact } from "../../services/contactService";

const ContactDetails: React.FC<contactIdProps> = (contactId) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<ContactInterface>();
  const navigate = useNavigate();

  const getContactData = async () => {
    await getContact(contactId.contactId)
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => {
        message.error("Some error occurred. Please try again later");
        navigate("/");
      });
  };

  useEffect(() => {
    verifyToken();
    getContactData();
  }, []);

  if (data) {
    return (
      <React.Fragment>
        <div className="add-contactBtn">
          <Button
            className="primaryBtn"
            type="primary"
            onClick={() => setVisible(true)}
          >
            Details
          </Button>
        </div>
        <Modal
          title="Contact Details"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={500}
        >
          <ContactCard data={data} />
        </Modal>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="add-contactBtn">
          <Button
            className="primaryBtn"
            type="primary"
            onClick={() => setVisible(true)}
          >
            Details
          </Button>
        </div>
        <Modal
          title="Contact Details"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={500}
        >
          <div className="contacts-load-screen">
            <Skeleton className="loading-skeleton" active />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
};

export default ContactDetails;
