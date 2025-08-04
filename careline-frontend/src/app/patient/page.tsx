"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Typography, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import TicketModal from "@/components/modal/ticket-modal";
import { ITicket, TicketActionContext, TicketStateContext } from "@/providers/ticket-provider/context";
import { useSignalRConnection } from "@/hooks/useSignalRConnection";
//import { NotificationDisplay } from "@/components/NotificationDisplay";

const { Title } = Typography;

export default function PatientHomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { getMyTickets } = useContext(TicketActionContext);
  const { tickets, isPending } = useContext(TicketStateContext);
  //const { isConnected } = useSignalRConnection();
  const patientId = typeof window !== "undefined" ? sessionStorage.getItem("patientId") : null;

  useEffect(() => {
    if(patientId && getMyTickets) {
      getMyTickets();
    }
  }, []);

  const activeQueueId = tickets?.[0]?.queueId ?? null;
  const activeQueueTickets = tickets
    ?.filter((t: ITicket) => t.queueId === activeQueueId)
    ?.sort((a: ITicket, b: ITicket) => (a.queueNumber ?? 0) - (b.queueNumber ?? 0));

    const columns = [
      {
        title: "Queue Number",
        dataIndex: "queueNumber",
        key: "queueNumber"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: number) => {
          switch (status) {
            case 1:
              return "Waiting";
            case 2:
              return "Being Served";
            case 3:
              return "Completed";
            default:
              return "Unknown";
        }
      }
    }
    ]
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

      <Card title="Current Queue">
        <Table
          dataSource={activeQueueTickets?.map((ticket: ITicket) => ({
            ...ticket,
            key: ticket.id
          }))}
          columns={columns}
          loading={isPending}
          pagination={false}
          rowClassName={(record: ITicket) =>
            record.patientId === patientId ? "highlight-row" : ""
          }
        />
      </Card>

      {/* Ticket Modal */}
      <TicketModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
