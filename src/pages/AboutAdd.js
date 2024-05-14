import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

function AboutAdd() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onAdd = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:7000/interior/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add new FAQ entry");
      }

      const data = await response.json();
      console.log("New FAQ entry added:", data);
      message.success("New FAQ entry added successfully", data);
      navigate("/admin/about");
    } catch (error) {
      console.error("Error adding new FAQ entry:", error.message);
      message.error("Failed to add new FAQ entry");
      navigate("/admin/about");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h3>Add New Entry</h3>
      <Form onFinish={onAdd}>
        <Form.Item name="question" label="Question">
          <Input />
        </Form.Item>
        <Form.Item name="answer" label="Answer">
          <TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Entry
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AboutAdd;
