import { Button, Modal, Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ContactForm from "../forms/ContactForm";
import { formItemLayout, tailFormItemLayout2 } from "../forms/common";
import "./styles/common.css";
import { addContact } from "../../services/contactService";
import { verifyToken } from "../../services/userService";
import { ReloadHandlerProps } from "./interface/contactInterface";

const AddContact: React.FC<ReloadHandlerProps> = ({ reloadHandler }) => {
  const [visible, setVisible] = useState(false);
  const [picture, setPicture] = useState<string | ArrayBuffer | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const initialContactData = {
    name: "",
    phone: {
      phone_number: "",
      label: "cell",
    },
    email: "",
    address: "",
    is_favorite: false,
  };

  const onSubmit = async (values: any) => {
    await verifyToken();
    values.picture = picture;

    await addContact(values)
      .then(() => {
        setVisible(false);
        navigate("/");
        reloadHandler();
        message.success("Contact successfully added.", 5);
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
    setPicture(data);
  };

  return (
    <React.Fragment>
      <div className="add-contactBtn">
        <Button
          className="primaryBtn"
          type="primary"
          onClick={() => setVisible(true)}
        >
          Add contact
        </Button>
      </div>
      <Modal
        title="Add new contact"
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
              Add contact
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AddContact;
