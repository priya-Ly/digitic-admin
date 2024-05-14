import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MainAboutEdit = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing data for the specified ID
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/interior/aboutus/${id}`
        );
        const data = await response.json();
        // Populate form fields with existing data
        console.log(data, "get");
        form.setFieldsValue({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchData();
  }, [id, form]);

  const handleEdit = async (values) => {
    const { title, description, subtitle } = values;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch(
        `http://localhost:7000/interior/aboutus/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data, "from main edit");
      if (response.ok) {
        setImage(null);
        console.log("About Main Section updated successfully:", data.updated);
        message.success("About Main Section updated successfully");
        navigate("/admin/aboutus");
      } else {
        console.error(
          "Failed to update About Main Section:",
          data.message || "Something went wrong"
        );
        message.error(data.message || "Failed to update About Main Section");
        navigate("/admin/aboutus");
      }
    } catch (error) {
      console.error("Failed to update About Main Section:", error);
      message.error("Failed to update About Main Section");
      navigate("/admin/about");
    }
  };

  const handleFileChange = (info) => {
    if (info.file instanceof File) {
      setImage(info.file);
    }
  };

  return (
    <div>
      <h3>Edit Aboutus</h3>
      <Form form={form} onFinish={handleEdit}>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="subtitle" label="Subtitle">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={image ? [image] : []}
          >
            <Button icon={<UploadOutlined />}>Upload Single Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MainAboutEdit;
