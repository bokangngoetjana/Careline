"use client";

import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Typography, Tag, Spin } from "antd";
import { TicketActionContext, TicketStateContext, ITicket } from "@/providers/ticket-provider/context";
import { useMedicalHistoryActions, useMedicalHistoryState } from "@/providers/medhistory-provider";

const { Title } = Typography;

export default function MedicalHistoryPage() {
  const { getByTicketId } = useMedicalHistoryActions();
  const { medicalHistories, isPending } = useMedicalHistoryState();

  const { getMyTickets } = useContext(TicketActionContext);
  const { tickets } = useContext(TicketStateContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<any>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const patientId =
    typeof window !== "undefined" ? sessionStorage.getItem("patientId") : null;

  // Fetch all patient's tickets
  useEffect(() => {
    if (!patientId) return;
    getMyTickets();
  }, [patientId]);

  // Show only completed tickets
  const completedTickets =
    tickets?.filter(
      (t: ITicket) => t.patientId === patientId && t.status === 3
    ) || [];

  // Handle view history
  const handleViewHistory = async (ticket: ITicket) => {
    setSelectedTicket(ticket);
    setLoadingHistory(true);

    await getByTicketId(ticket.id!);

    // Wait a tick for state to update from provider
    const found = medicalHistories?.find((mh) => mh.ticketId === ticket.id);
    setSelectedHistory(found || null);

    setLoadingHistory(false);
    setModalOpen(true);
  };

  const columns = [
    {
      title: "Queue Number",
      dataIndex: "queueNumber",
      key: "queueNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag color={status === 3 ? "green" : "default"}>
          {status === 3 ? "Completed" : "Unknown"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ITicket) => (
        <a onClick={() => handleViewHistory(record)}>View Medical History</a>
      ),
    },
  ];

  return (
    <div>
      <Title level={3} style={{ color: "#292966" }}>
        My Medical History
      </Title>

      <Table
        dataSource={completedTickets.map((t) => ({ ...t, key: t.id }))}
        columns={columns}
        loading={isPending}
        pagination={{ pageSize: 5 }}
      />

      {/* Medical History Modal */}
      <Modal
        title={`Medical History - Ticket #${selectedTicket?.queueNumber || ""}`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={600}
      >
        {loadingHistory ? (
          <Spin />
        ) : selectedHistory ? (
          <div>
            <p>
              <strong>Notes:</strong>{" "}
              {selectedHistory.notes || "N/A"}
            </p>
            <p>
              <strong>Medication Prescribed:</strong>{" "}
              {selectedHistory.medicationPrescribed || "N/A"}
            </p>
            <p>
              <strong>Dosage:</strong> {selectedHistory.dosage || "N/A"}
            </p>
            <p>
              <strong>Follow Up Instructions:</strong>{" "}
              {selectedHistory.followUpInstructions || "N/A"}
            </p>
            <p>
              <strong>Blood Pressure:</strong>{" "}
              {selectedHistory.bloodPressure || "N/A"}
            </p>
            <p>
              <strong>Weight:</strong>{" "}
              {selectedHistory.weight || "N/A"}
            </p>
          </div>
        ) : (
          <p>No medical history found for this ticket.</p>
        )}
      </Modal>
    </div>
  );
}
