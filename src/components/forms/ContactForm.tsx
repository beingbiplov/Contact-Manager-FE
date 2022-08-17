import { Select, Form, Input, Checkbox } from "antd";

import React from "react";

const { Option } = Select;

interface picProps {
  setPicture: (data: string | ArrayBuffer | null) => void;
}

const ContactForm: React.FC<picProps> = ({ setPicture }) => {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    setFile(file);
  };

  const setFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture(reader.result);
    };
  };
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
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          onChange={handleFileInputChange}
        />
        {/* <Upload maxCount={1} onChange={handleFileInputChange}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
      </Form.Item>
    </React.Fragment>
  );
};

export default ContactForm;
