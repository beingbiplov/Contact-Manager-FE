import {
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  ProfileOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";

import "./styles/conatactCard.css";
import { contactInterfaceProps } from "./interface/contactInterface";

const ContactCard: React.FC<contactInterfaceProps> = (contactData) => {
  const data = contactData.data;
  let avatarUrl: string;
  if (data.picture) {
    avatarUrl = data.picture;
  } else {
    avatarUrl = "https://joeschmoe.io/api/v1/random";
  }

  return (
    <Card style={{ width: 400 }}>
      <div className="contactCard-top">
        <Avatar
          src={avatarUrl}
          size={{ xs: 32, sm: 48, md: 60, lg: 100, xl: 116, xxl: 136 }}
          className="contact-avatar"
        />

        <div className="contactCard-top-right">
          <p>
            <UserOutlined />
            <span className="contact-details contact-details-head">
              {data.name}
            </span>
          </p>
          <p>
            <PhoneOutlined />
            <span className="contact-details">
              {" "}
              {data.phone_number} ({data.label})
            </span>
          </p>
          <p>
            <MailOutlined />
            <span className="contact-details">
              <a href="mailto:someone@example.com"> {data.email} </a>
            </span>
          </p>
          <p>
            <ProfileOutlined />
            <span className="contact-details"> {data.address}</span>
          </p>
          <p>
            Fav:
            {data.is_favorite ? (
              <HeartFilled className="contact-details heart heart_full" />
            ) : (
              <HeartOutlined className="contact-details heart" />
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};
export default ContactCard;
