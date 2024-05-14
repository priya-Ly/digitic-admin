import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/home");
        const data = await response.json();
        console.log(data);
        setHomeData(data);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Action",
      dataIndex: "_id", // Use a unique identifier
      render: (_, record) => (
        <span>
          <Link to={`/admin/home/${record._id}`}>Edit</Link>
          <br />
          <Link to={`/admin/home/delete/${record._id}`}>Delete</Link>
        </span>
      ),
    },
  ];
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
      <h3 className="mb-4 title">Home</h3>
      <Link to={`/admin/home/add/`} style={buttonStyle}>
        <Button>Add</Button>
      </Link>

      <div>
        <Table
          columns={columns}
          dataSource={homeData}
          loading={loading}
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default Home;
