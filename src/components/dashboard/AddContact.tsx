import { Button, Modal, Form, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ContactForm from "../forms/ContactForm";
import { formItemLayout, tailFormItemLayout2 } from "../forms/common";
import "./styles/common.css";
import { addContact } from "../../services/contactService";
import { verifyToken } from "../../services/userService";

const AddContact: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    await verifyToken();
    await addContact(values)
      .then(() => {
        setVisible(false);
        navigate("/");
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
          scrollToFirstError
        >
          <ContactForm />
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
