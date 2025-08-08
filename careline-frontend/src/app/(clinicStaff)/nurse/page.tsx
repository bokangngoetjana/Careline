'use client';
import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Table, Tag, Space, Select } from 'antd';
import { useStyles } from '../Style/style';
import { useVisitQueueActions, useVisitQueueState } from '@/providers/queue-provider';
import { useTicketActions, useTicketState } from '@/providers/ticket-provider';
import { ITicket } from '@/providers/ticket-provider/context';
import { useMedicalHistoryActions } from '@/providers/medhistory-provider';
import { AddMedicalHistoryModal } from '@/components/modal/AddMedicalHistoryModal';

const NurseDashboard: React.FC = () => {
  const { styles } = useStyles();

  // Use getVisitQueues to fetch all queues instead of getActiveVisitQueue
  const { getVisitQueues } = useVisitQueueActions();
  const { visitQueues } = useVisitQueueState();

  const { getAllTickets, assignStaffToTicket, updateTicketStatus } = useTicketActions();
  const { tickets } = useTicketState();

  const { createMedicalHistory } = useMedicalHistoryActions();

  const staffId = typeof window !== 'undefined' ? sessionStorage.getItem('nurseId') : null;

  const [localTickets, setLocalTickets] = useState<ITicket[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedQueueId, setSelectedQueueId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);

  // Sync local tickets when provider tickets change
  useEffect(() => {
    if (tickets) setLocalTickets(tickets);
  }, [tickets]);

  // Fetch all queues and all tickets on mount
  useEffect(() => {
    getVisitQueues();
    getAllTickets();
  }, []);

  const handleAssign = async (ticketId: string) => {
    if (!staffId) return;

    setLocalTickets(prev =>
      prev.map(t =>
        t.id === ticketId ? { ...t, status: 2, staffId } : t
      )
    );

    await assignStaffToTicket(ticketId, staffId);
    await getAllTickets();
  };

  const handleOpenModal = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setModalOpen(true);
  };

  const handleSaveMedicalHistory = async (values: any) => {
    if (!selectedTicketId) return;
    setSaving(true);
    await createMedicalHistory({
      ticketId: selectedTicketId,
      ...values
    });
    await updateTicketStatus(selectedTicketId, 3);
    const completedTicket = localTickets.find(t => t.id === selectedTicketId);
    const queueId = completedTicket?.queueId;

    const nextTicket = getNextTicketInQueue(queueId, localTickets);

    if(nextTicket){
      await assignStaffToTicket(nextTicket.id, staffId);
      await updateTicketStatus(nextTicket.id, 2);
    }

    setSaving(false);
    setModalOpen(false);
    await getAllTickets();
  };

  // Columns for queues table
  const queueColumns = [
    { title: 'Queue Name', dataIndex: 'name', key: 'name' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime',
      render: (time: string) => new Date(time).toLocaleString() },
    { title: 'End Time', dataIndex: 'endTime', key: 'endTime',
      render: (time: string) => new Date(time).toLocaleString() },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        if (status === 1) return <Tag color="green">Open</Tag>;
        if (status === 2) return <Tag color="orange">Paused</Tag>;
        if (status === 3) return <Tag color="red">Closed</Tag>;
        return <Tag color="default">Unknown</Tag>;
      }
    }
  ];

  // Columns for tickets table
  const ticketColumns = [
    { title: 'Queue Name', dataIndex: 'queueName', key: 'queueName' },
    { title: 'Patient', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Ticket No.', dataIndex: 'queueNumber', key: 'queueNumber' },
    { title: 'Symptoms', dataIndex: 'symptoms', key: 'symptoms' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        if (status === 1) return <Tag color="volcano">Waiting</Tag>;
        if (status === 2) return <Tag color="blue">In Progress</Tag>;
        if (status === 3) return <Tag color="green">Completed</Tag>;
        return <Tag color="default">Unknown</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          {record.status === 2 && record.staffId === staffId ? (
            <Button type="default" onClick={() => handleOpenModal(record.id)}>
              Add Medical History
            </Button>
          ) : record.status === 1 ? (
            <Button type="primary" onClick={() => handleAssign(record.id)}>
              Assign to Me
            </Button>
          ) : (
            <Button disabled>Completed</Button>
          )}
        </Space>
      )
    }
  ];
const getNextTicketInQueue = (queueId: string, tickets: ITicket[]) => {
  const queueTickets = tickets
    .filter(t => t.queueId === queueId && t.status === 1) // Only waiting
    .sort((a, b) => a.queueNumber - b.queueNumber); // Ordered by queue number
  return queueTickets[0] || null;
};

  // Map queues for table data
  const queueTableData = visitQueues?.map(queue => ({
    key: queue.id,
    ...queue,
  })) || [];

  // Map tickets for table data, link queueName from queues
  const ticketTableData = localTickets
  .filter(ticket => !selectedQueueId || ticket.queueId === selectedQueueId)
  .map(ticket => ({
    key: ticket.id,
    ...ticket,
    queueName: visitQueues?.find(q => q.id === ticket.queueId)?.name ?? 'Unknown',
    patientName: ticket.patientId ?? 'Unknown',
  }));

  return (
    <>
      <Typography.Title level={3}>Welcome Nurse</Typography.Title>

      <Card title="All Queues" className={styles.card} style={{ marginBottom: 24 }}>
        <Table columns={queueColumns} dataSource={queueTableData} pagination={false} />
      </Card>

      <Card
  title={
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>All Tickets</span>
      <Select
        placeholder="Filter by Queue"
        allowClear
        style={{ width: 250 }}
        onChange={(value) => setSelectedQueueId(value)}
      >
        <Select.Option value={null}>All Queues</Select.Option>
        {visitQueues?.map(queue => (
          
          <Select.Option key={queue.id} value={queue.id}>
            {queue.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  }
  className={styles.card}
>

        <Table columns={ticketColumns} dataSource={ticketTableData} pagination={{ pageSize: 10 }} />
      </Card>

      <AddMedicalHistoryModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSave={handleSaveMedicalHistory}
        loading={saving}
      />
    </>
  );
};

export default NurseDashboard;