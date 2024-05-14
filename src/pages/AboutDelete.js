import React from "react";
import { Button, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;
const AboutDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    confirm({
      title: "Are you sure you want to delete this entry?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await fetch(
            `http://localhost:7000/interior/about/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          if (response.ok) {
            message.success("Entry deleted successfully");
            navigate("/admin/about");
          } else {
            message.error(data.message || "Failed to delete entry");
            navigate("/admin/about");
          }
        } catch (error) {
          console.error("Failed to delete entry:", error);
          message.error("Failed to delete entry");
          navigate("/admin/about");
        }
      },
    });
  };
  const buttonStyle = {
    backgroundColor: "white",
    border: "2px solid black",
    color: "black",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "12px",
  };
  return (
    <div>
      <h3>Delete About Entry</h3>
      <Button onClick={handleDelete} type="danger" style={buttonStyle}>
        Delete
      </Button>
    </div>
  );
};

export default AboutDelete;
