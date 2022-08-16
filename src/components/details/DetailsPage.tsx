import { message, Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ContactCard from "../dashboard/ContactCard";
import "./styles/common.css";
import { verifyToken } from "../../services/userService";
import ContactInterface from "../dashboard/interface/contactInterface";
import { getContact } from "../../services/contactService";

const DetailsPage: React.FC = () => {
  const [data, setData] = useState<ContactInterface>();
  const navigate = useNavigate();
  const params = useParams();
  let contact_id: number;

  if (params.id) {
    contact_id = +params.id;
  } else {
    message.error("Some error occurred. Please try again later");
    navigate("/");
  }
  const getContactData = async () => {
    await getContact(contact_id)
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 403) {
          message.error("You do not have access to this resource");
          navigate("/unauthorized");
        } else {
          message.error("Some error occurred. Please try again later");
          navigate("/");
        }
      });
  };

  useEffect(() => {
    verifyToken();
    getContactData();
  }, []);

  if (data) {
    return (
      <div className="details_card">
        <ContactCard data={data} />
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="contacts-load-screen">
          <Skeleton className="loading-skeleton" active />
        </div>
      </React.Fragment>
    );
  }
};

export default DetailsPage;
