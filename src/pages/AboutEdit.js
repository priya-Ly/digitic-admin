import { message } from "antd";
import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AboutEdit() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch existing data for the specified ID
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/interior/faq/${id}`
        );
        const data = await response.json();
        // Populate form fields with existing data
        console.log(data, "get");
        form.setFieldsValue({
          question: data.question,
          answer: data.answer,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchData();
  }, [id, form]);
  const handleEdit = async (values) => {
    try {
      const response = await fetch(`http://localhost:7000/interior/faq/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message, data);
        message.success("About Updated Successfully");
        navigate("/admin/about");
      } else {
        const data = await response.json();
        console.error("Failed to update home:", data.message);
        message.error(`Failed to update home: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to update home:", error);
      message.error(`Failed to update home: ${JSON.stringify(error)}`);
      navigate("/admin/about");
    }
  };
  return (
    <div>
      <h3>Edit About</h3>
      <Form form={form} onFinish={handleEdit}>
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="question" label="Question">
          <Input />
        </Form.Item>
        <Form.Item name="answer" label="Answer">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AboutEdit;
