import React, { useState, useEffect } from "react";
import { Table, Image, Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
const InteriorGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt"); // Default sorting column
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(4); // Number of items per page

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/gallery");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        console.log(data);
        setImages(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchImages();
  }, []);
  const handleSort = (column) => {
    if (column === sortBy) {
      // Toggle sorting order if clicking on the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sorting column and default sorting order (descending)
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setSortBy(sorter.field);
    setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const filteredData = images.filter((item) =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const buttonStyle = {
    background: "linear-gradient(yellow, #ff7e5f, #Ffffed)",
    backgroundColor: "white",
    border: "2px solid black",
    color: "black",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "12px",
    padding: "8px 10px",
    margin: "2px 3px",
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image
          src={text}
          alt="Interior design"
          style={{ width: 100, height: 100 }}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: true,
      sortOrder: sortBy === "category" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleSort("category"),
      }),
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      sorter: true,
      sortOrder: sortBy === "updatedAt" && sortOrder,
      render: (text) => (
        <span>
          {text}
          {sortBy === "updatedAt" && (
            <span style={{ marginLeft: 8 }}>
              {sortOrder === "asc" ? <UpOutlined /> : <DownOutlined />}
            </span>
          )}
        </span>
      ),
      onHeaderCell: () => ({
        onClick: () => handleSort("updatedAt"),
      }),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_, record) => (
        <span>
          <Link to={`/admin/gallery/${record._id}`} style={buttonStyle}>
            Edit
          </Link>
          <br />
          <Link to={`/admin/gallery/delete/${record._id}`} style={buttonStyle}>
            Delete
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Interior Portfolio Gallery</h3>
      <Space>
        <Input.Search
          placeholder="Search Category"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Link to={`/admin/gallery/add/`} style={buttonStyle}>
          Add
        </Link>
      </Space>

      {error && <p>Error: {error}</p>}
      <Table
        columns={columns}
        dataSource={paginatedData}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default InteriorGallery;
