import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomeEdit = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch existing data for the specified ID
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/interior/home/${id}`
        );
        const data = await response.json();
        console.log(data, "get");
        form.setFieldsValue({
          title: data.title,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, form]);
  const handleEdit = async (values) => {
    const { title, description } = values;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    images.forEach((image) => {
      formData.append("images", image.originFileObj);
      console.log(image.originFileObj);
    });
    try {
      const response = await fetch(
        `http://localhost:7000/interior/home/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Home updated successfully:", data.updatedHome);
        message.success("Home updated successfully");
        navigate("/admin/home");
      } else {
        console.error(
          "Failed to update home:",
          data.message || "Something went wrong"
        );
        message.error(data.message || "Failed to update home");
        navigate("/admin/home");
      }
    } catch (error) {
      console.error("Failed to update home:", error);
      message.error("Failed to update home");
      navigate("/admin/home");
    }
  };

  const handleFileChange = (info) => {
    setImages(info.fileList);
    console.log(info.fileList, "fl");
  };

  return (
    <div>
      <h3>Edit Home</h3>
      <Form form={form} onFinish={handleEdit}>
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="images" label="Images">
          <Upload
            multiple
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={images}
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
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

export default HomeEdit;
