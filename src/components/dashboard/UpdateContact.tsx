import { Button, Modal, Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ContactForm from "../forms/ContactForm";
import { formItemLayout, tailFormItemLayout2 } from "../forms/common";
import "./styles/common.css";
import { updateContact } from "../../services/contactService";
import { verifyToken } from "../../services/userService";
import { contactWithReloaderProps } from "./interface/contactInterface";

const UpdateContact: React.FC<contactWithReloaderProps> = ({
  data,
  reloadHandler,
}) => {
  const [visible, setVisible] = useState(false);
  const [updatedPicture, setUpdatedPicture] = useState<
    string | ArrayBuffer | null
  >(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const initialContactData = {
    name: data.name,
    phone: {
      phone_number: data.phone_number,
      label: data.label,
    },
    email: data.email,
    address: data.address,
    is_favorite: data.is_favorite,
  };

  const onSubmit = async (values: any) => {
    await verifyToken().then(() => {});
    let dataToUpdate = {
      contact_id: data.contact_id,
      name: values.name,
      phone: {
        phone_id: data.phone_id,
        phone_number: values.phone.phone_number,
        label: values.phone.label,
      },
      email: values.email,
      address: values.address,
      is_favorite: values.is_favorite,
      picture: updatedPicture,
    };

    await updateContact(data.contact_id, dataToUpdate)
      .then(() => {
        setVisible(false);
        navigate("/");
        reloadHandler();
        message.success("Contact successfully updated.", 5);
      })
      .catch((err) => {
        const errMsg = "unexpected error occurred. Please try agin later!";
        message.error({
          content: errMsg,
          style: {
            marginTop: "8%",
          },
          duration: 5,
        });
      });
  };

  const setPictureToState = (data: string | ArrayBuffer | null) => {
    setUpdatedPicture(data);
  };

  return (
    <React.Fragment>
      <div className="add-contactBtn">
        <Button
          className="secondaryBtn"
          type="primary"
          onClick={() => setVisible(true)}
        >
          Edit
        </Button>
      </div>
      <Modal
        title="Update contact"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="add-contact"
          onFinish={onSubmit}
          initialValues={initialContactData}
          scrollToFirstError
        >
          <ContactForm setPicture={setPictureToState} />
          <Form.Item {...tailFormItemLayout2}>
            <Button className="primaryBtn" type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default UpdateContact;
