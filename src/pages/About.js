import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";

function About() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposne = await fetch("http://localhost:7000/interior/faq");
        const data = await resposne.json();
        console.log(data);
        setAboutData(data);
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
    },

    {
      title: "Answer",
      dataIndex: "answer",
      render: (answer) => (
        <div style={{ whiteSpace: "pre-line" }}>{answer.join("\n")}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id", // Use a unique identifier
      render: (_, record) => (
        <span>
          <Link to={`/admin/about/${record._id}`} style={buttonStyle}>
            Edit
          </Link>
          <br />
          <Link to={`/admin/about/delete/${record._id}`} style={buttonStyle}>
            Delete
          </Link>
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
    borderRadius: "8px",
    padding: "4px 4px",
    margin: "2px 2px",
  };
  return (
    <div>
      <h3 className="mb-4 title">Home</h3>
      <Link to={`/admin/about/add/`} style={buttonStyle}>
        <Button>Add</Button>
      </Link>

      <div>
        <Table
          columns={columns}
          dataSource={aboutData}
          loading={loading}
          rowKey="_id"
        />
      </div>
    </div>
  );
}

export default About;
