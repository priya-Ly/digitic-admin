import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const HomeAdd = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  console.log("images: ", images);

  const handleAdd = async (values) => {
    const { title, description } = values;
    console.log(title, description, images, "td");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      images.forEach((image) => {
        formData.append("images", image.originFileObj);
        console.log(image.originFileObj);
      });

      const response = await fetch("http://localhost:7000/interior/home", {
        method: "POST",
        body: formData,
      });
      console.log(response, "resp");
      const data = await response.json();
      console.log(data, "dd");
      if (response.ok) {
        console.log("New entry added successfully:", data);
        setImages([]); // Clear images after successful submission
        message.success("New entry added successfully");
        navigate("/admin/home");
      } else {
        console.error("Error:", data.message);
        message.error(data.message);
        navigate("/admin/home");
      }
    } catch (error) {
      console.error("Error:", error.message);
      message.error(error.message);
      navigate("/admin/home");
    }
  };

  const handleFileChange = (info) => {
    setImages(info.fileList);
    console.log(info.fileList, "fl");
  };

  return (
    <div>
      <h3>Add New Entry</h3>
      <Form onFinish={handleAdd}>
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
            Add Entry
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HomeAdd;
