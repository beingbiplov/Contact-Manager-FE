import {
  EditOutlined,
  DeleteOutlined,
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  MailOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";

import "./styles/conatactCard.css";

const ContactCard: React.FC = () => {
  const removeContact = (values: any) => {
    console.log(values);
  };

  const editContact = (values: any) => {
    console.log(values);
  };
  return (
    <Card
      style={{ width: 400 }}
      actions={[
        <EditOutlined key="edit" onClick={() => editContact(1)} />,
        <DeleteOutlined key="delete" onClick={() => removeContact(1)} />,
      ]}
    >
      <div className="contactCard-top">
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          size={{ xs: 32, sm: 48, md: 60, lg: 100, xl: 116, xxl: 136 }}
          className="contact-avatar"
        />

        <div className="contactCard-top-right">
          <p>
            <UserOutlined />{" "}
            <span className="contact-details contact-details-head">
              Biplov Sharma
            </span>
          </p>
          <p>
            <PhoneOutlined />{" "}
            <span className="contact-details"> 9874662155</span>
          </p>
          <p>
            <HomeOutlined />{" "}
            <span className="contact-details"> 9874662155</span>
          </p>

          <p>
            <MailOutlined />{" "}
            <span className="contact-details">
              <a href="mailto:someone@example.com"> abcas@gmail.com </a>
            </span>
          </p>
          <p>
            <ProfileOutlined />{" "}
            <span className="contact-details"> Kathmandu, Nepal</span>
          </p>
        </div>
      </div>
      {/* <Meta title="Biplov Sharma" description="" /> */}
    </Card>
  );
};
export default ContactCard;
