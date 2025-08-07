"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Card, Typography, Table, Tag, Popconfirm, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import TicketModal from "@/components/modal/ticket-modal";
import { ITicket, TicketActionContext, TicketStateContext } from "@/providers/ticket-provider/context";
import { useVisitQueueState } from "@/providers/queue-provider"; // <-- so we can get queue info

const { Title } = Typography;

export default function PatientHomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { getMyTickets, deleteTicket } = useContext(TicketActionContext);
  const { tickets, isPending } = useContext(TicketStateContext);
  const { visitQueues } = useVisitQueueState(); // queues from provider
  const [queueTickets, setQueueTickets] = useState<ITicket[]>([]);
  const { getTicketsByQueueId } = useContext(TicketActionContext);
  const patientId = typeof window !== "undefined" ? sessionStorage.getItem("patientId") : null;
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Initial fetch + polling every 2 minutes
  useEffect(() => {
    if (!patientId) return;

    getMyTickets(); // initial fetch

    if (tickets && tickets.length > 0) {
      pollingRef.current = setInterval(() => {
        getMyTickets();
      }, 50000); 
    }

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [patientId, tickets?.length]);

  // Find the patient's active ticket
  const myActiveTicket = tickets?.find(
    (t: ITicket) => t.patientId === patientId && t.status !== 3
  );

  // Get the queue name for their active ticket
  const myQueueName = myActiveTicket
    ? visitQueues?.find((q) => q.id === myActiveTicket.queueId)?.name || "Unknown Queue"
    : null;
useEffect(() => {
  async function fetchQueueTickets() {
    if (myActiveTicket?.queueId) {
      await getTicketsByQueueId(myActiveTicket.queueId);
      setQueueTickets(tickets.filter(t => t.queueId === myActiveTicket.queueId && t.id !== myActiveTicket.id));
    } else {
      setQueueTickets([]);
    }
  }
  fetchQueueTickets();
}, []);
  const handleCancelTicket = async (ticketId: string) => {
    const updatedTickets = tickets?.filter((t) => t.id !== ticketId);

    await deleteTicket(ticketId);
    message.success("Your ticket has been cancelled.");
    await getMyTickets();
  };
  

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
            return <Tag color="volcano">Waiting</Tag>;
          case 2:
            return <Tag color="blue">Being Served</Tag>;
          case 3:
            return <Tag color="green">Completed</Tag>;
          default:
            return <Tag>Unknown</Tag>;
        }
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ITicket) =>
        record.patientId === patientId && record.status === 1 ? (
          <Popconfirm
            title="Cancel Ticket"
            description="Are you sure you want to cancel your ticket?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleCancelTicket(record.id!)}
          >
            <Button danger>Cancel</Button>
          </Popconfirm>
        ) : null
    }
  ];

  const tableData = myActiveTicket
    ? [
        {
          key: myActiveTicket.id,
          ...myActiveTicket
        }
      ]
    : [];

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
          disabled={!!myActiveTicket} // disable if already in queue
        >
          {myActiveTicket ? "Already in Queue" : "Join Queue"}
        </Button>
      </Card>

      {/* Current Ticket */}
      <Card title={myQueueName ? `My Active Ticket (${myQueueName})` : "My Active Ticket"}>
        {myActiveTicket ? (
          <Table
            dataSource={tableData}
            columns={columns}
            loading={isPending}
            pagination={false}
            rowClassName={(record: ITicket) =>
              record.patientId === patientId ? "highlight-row" : ""
            }
          />
        ) : (
          <p>No active ticket. Please join a queue.</p>
        )}
      </Card>
      {queueTickets.length > 0 && (
  <Card title={`Other Tickets in Queue (${myQueueName})`} style={{ marginTop: 24 }}>
    <Table
      dataSource={queueTickets.map(t => ({ key: t.id, ...t }))}
      columns={[
        {
          title: "Queue Number",
          dataIndex: "queueNumber",
          key: "queueNumber",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (status: number) => {
            switch (status) {
              case 1: return <Tag color="volcano">Waiting</Tag>;
              case 2: return <Tag color="blue">Being Served</Tag>;
              case 3: return <Tag color="green">Completed</Tag>;
              default: return <Tag>Unknown</Tag>;
            }
          },
        },
      ]}
      pagination={false}
      loading={isPending}
    />
  </Card>
)}
      {/* Ticket Modal */}
      <TicketModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
