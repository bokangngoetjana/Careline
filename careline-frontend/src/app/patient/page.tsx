"use client";
import React, { useState } from "react";
import { Button, Card, Table, Typography, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function PatientHomePage() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [ticket, setTicket] = useState<number | null>(null);

  const handleCheckIn = () => {
    // Simulate API call
    const newTicket = Math.floor(Math.random() * 1000);
    setTicket(newTicket);
    setCheckedIn(true);
    message.success(`You are checked in! Ticket #${newTicket}`);
  };

  const queueData = [
    { key: "1", ticket: 101, status: "Being served" },
    { key: "2", ticket: 102, status: "Waiting" },
    { key: "3", ticket: 103, status: "Waiting" },
  ];

  const columns = [
    { title: "Ticket", dataIndex: "ticket", key: "ticket" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div>
      <Title level={3} style={{ color: "#292966" }}>
        Patient Dashboard
      </Title>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Check-In</Title>
        <p>Click the button below to join the queue and receive your ticket.</p>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          size="large"
          style={{ backgroundColor: "#292966", borderColor: "#292966" }}
          onClick={handleCheckIn}
          disabled={checkedIn}
        >
          {checkedIn ? `Checked In (Ticket #${ticket})` : "Join Queue"}
        </Button>
      </Card>

      <Card>
        <Title level={4}>Live Queue</Title>
        <Table dataSource={queueData} columns={columns} pagination={false} />
      </Card>
    </div>
  );
}
