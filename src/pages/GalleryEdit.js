import { Form, Input, Button, Upload, message, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

function GalleryEdit() {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/interior/gallery/get/${id}`
        );
        const data = await response.json();
        console.log(data, "get");
        if (data.image) {
          setImage({
            uid: "-1",
            name: data.image.split("/").pop(),
            status: "done",
            url: data.image,
          });
        }
        form.setFieldsValue({
          category: data.category,
          order: data.order,
        });
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
    };
    fetchData();
  }, [id, form]);

  const handleEdit = async (values) => {
    const { order, category } = values;
    const formData = new FormData();
    formData.append("category", category);
    formData.append("order", order);
    if (image && image.originFileObj) {
      formData.append("image", image.originFileObj);
    }
    try {
      const response = await fetch(
        `http://localhost:7000/interior/gallery/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data, "from gallery edit");
      if (response.ok) {
        setImage(null);
        console.log("Gallery Section updated successfully:", data.updated);
        message.success("Gallery Section updated successfully");
        navigate("/admin/gallery");
      } else {
        if (data.errors) {
          for (const key in data.errors) {
            if (Object.hasOwnProperty.call(data.errors, key)) {
              message.error(data.errors[key]);
            }
          }
        }
        console.error(
          "Failed to update Gallery Section:",
          data.message || "Something went wrong"
        );
        message.error(data.message || "Failed to update Gallery Section");
      }
    } catch (error) {
      console.error("Failed to update Gallery Section:", error);
      message.error("Failed to update Gallery Section");
    }
  };
  const handleFileChange = (info) => {
    if (info.file instanceof File) {
      setImage({
        uid: info.file.uid,
        name: info.file.name,
        status: "done",
        originFileObj: info.file,
        url: URL.createObjectURL(info.file),
      });
    }
  };
  const customItemRender = (originNode, file) => {
    if (file.url) {
      return (
        <div>
          <img
            src={file.url}
            alt={file.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div>{file.name}</div>
        </div>
      );
    }
    return originNode;
  };
  return (
    <div>
      <h3>Edit Gallery</h3>
      <Form form={form} onFinish={handleEdit}>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="order" label="Order" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={image ? [image] : []}
            listType="picture"
            itemRender={customItemRender}
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
}

export default GalleryEdit;
