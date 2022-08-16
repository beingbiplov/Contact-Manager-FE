import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, message } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";

import ContactInterface from "./interface/contactInterface";
import ContactDetails from "./ContactDetails";
import { removeContact } from "../../services/contactService";
import { verifyToken } from "../../services/userService";

interface dataProps {
  data: ContactInterface[];
  handler: () => void;
}

type DataIndex = keyof ContactInterface;

const App: React.FC<dataProps> = ({ data, handler }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

  const onDelete = async (id: number) => {
    verifyToken();
    await removeContact(id)
      .then(() => {
        navigate("/");
        handler();
        message.success("Contact successfully deleted.", 5);
      })
      .catch((err) => {
        const errMsg = "unexpected error occurred. Please try agin later!";
        message.error({
          content: errMsg,
          duration: 5,
        });
      });
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<ContactInterface> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<ContactInterface> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a: ContactInterface, b: ContactInterface): number =>
        a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      width: "20%",
      ...getColumnSearchProps("phone_number"),
      render: (text, record) => <span>{record.phone_number}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ContactDetails contactId={record.contact_id} />
          <Button onClick={() => onDelete(record.contact_id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      className="contact-table"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 8 }}
    />
  );
};

export default App;
