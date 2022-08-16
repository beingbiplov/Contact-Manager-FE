import { Select, Form, Input, Button, Checkbox, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import React from "react";

const { Option } = Select;

const ContactForm: React.FC = () => {
  return (
    <React.Fragment>
      <Form.Item
        name="name"
        label="Name"
        tooltip="Enter name of the contact"
        rules={[
          {
            required: true,
            message: "Please input contact name!",
            whitespace: true,
          },
        ]}
      >
        <Input
          style={{ width: "68%" }}
          placeholder="Enter name for the contact"
        />
      </Form.Item>

      <Form.Item label="Phone">
        <Input.Group compact>
          <Form.Item
            name={["phone", "phone_number"]}
            noStyle
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input
              type="number"
              style={{ width: "50%" }}
              placeholder="Enter phone number"
            />
          </Form.Item>
          <Form.Item name={["phone", "label"]} noStyle>
            <Select placeholder="Select label">
              <Option value="cell">Cell</Option>
              <Option value="home">Home</Option>
              <Option value="work">Work</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input style={{ width: "68%" }} placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        tooltip="Please input contacts address"
        rules={[
          {
            whitespace: true,
          },
        ]}
      >
        <Input style={{ width: "68%" }} placeholder="Enter address" />
      </Form.Item>
      <Form.Item name="is_favorite" label="Favorite" valuePropName="checked">
        <Checkbox />
      </Form.Item>

      <Form.Item name="picture" label="Picture" valuePropName="checked">
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </React.Fragment>
  );
};

export default ContactForm;
