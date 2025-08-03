"use client";
import React, { useState } from "react";
import { Button, Card, Typography } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import TicketModal from "@/components/modal/ticket-modal";

const { Title } = Typography;

export default function PatientHomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Title level={3} style={{ color: "#292966" }}>
        Patient Dashboard
      </Title>

      {/* Check-In Card */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Check-In</Title>
        <p>Click the button below to join the queue and receive your ticket.</p>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          size="large"
          style={{ backgroundColor: "#292966", borderColor: "#292966" }}
          onClick={() => setModalOpen(true)}
        >
          Join Queue
        </Button>
      </Card>

      {/* Ticket Modal */}
      <TicketModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
