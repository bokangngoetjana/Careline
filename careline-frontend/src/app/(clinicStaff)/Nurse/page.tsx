'use client';
import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Table, Tag, Space } from 'antd';
import { useStyles } from '../Style/style';
import { useVisitQueueActions, useVisitQueueState } from '@/providers/queue-provider';
import { useTicketActions, useTicketState } from '@/providers/ticket-provider';
import { ITicket } from '@/providers/ticket-provider/context';

const NurseDashboard: React.FC = () => {
  const { styles } = useStyles();

  const { getActiveVisitQueue } = useVisitQueueActions();
  const { visitQueues } = useVisitQueueState();

  const { getTicketsByQueueId, assignStaffToTicket } = useTicketActions();
  const { tickets } = useTicketState();

  const staffId = typeof window !== 'undefined' ? sessionStorage.getItem('nurseId') : null;

  const [localTickets, setLocalTickets] = useState<ITicket[]>([]);

  // Sync local tickets when provider tickets change
  useEffect(() => {
    if (tickets) setLocalTickets(tickets);
  }, [tickets]);

  // Get active queue on mount
  useEffect(() => {
    getActiveVisitQueue();
  }, []);

  // Get tickets for the active queue
  useEffect(() => {
    if (visitQueues && visitQueues.length > 0 && visitQueues[0].id) {
      getTicketsByQueueId(visitQueues[0].id);
    }
  }, [visitQueues]);

  const handleAssign = async (ticketId: string) => {
    if (!staffId) return;

    // Optimistic update for instant UI feedback
    setLocalTickets(prev =>
      prev.map(t =>
        t.id === ticketId ? { ...t, status: 2, staffId } : t
      )
    );

    // Call backend
    await assignStaffToTicket(ticketId, staffId);

    // Re-fetch tickets from backend for accuracy
    if (visitQueues?.[0]?.id) {
      await getTicketsByQueueId(visitQueues[0].id);
    }
  };

  const columns = [
    { title: 'Queue Name', dataIndex: 'queueName', key: 'queueName' },
    { title: 'Patient', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Ticket No.', dataIndex: 'queueNumber', key: 'queueNumber' },
    { title: 'Symptoms', dataIndex: 'symptoms', key: 'symptoms' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const map: Record<number, { text: string; color: string }> = {
          1: { text: 'Waiting', color: 'volcano' },
          2: { text: 'In Progress', color: 'blue' },
          3: { text: 'Completed', color: 'green' }
        };
        const { text, color } = map[status] || { text: 'Unknown', color: 'default' };
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          {record.status === 2 && record.staffId === staffId ? (
            <Button type="default" disabled>
              Assigned to Me
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => handleAssign(record.id)}
              disabled={record.status !== 1}
            >
              Assign to Me
            </Button>
          )}
          <Button>View Full Queue</Button>
        </Space>
      )
    }
  ];

  const tableData =
    localTickets?.map(ticket => ({
      key: ticket.id,
      id: ticket.id,
      queueId: ticket.queueId,
      queueName: visitQueues?.find(q => q.id === ticket.queueId)?.name ?? '',
      patientName: ticket.patientId ?? 'Unknown', // Replace with actual name lookup if you have it
      queueNumber: ticket.queueNumber,
      symptoms: ticket.symptoms,
      status: ticket.status,
      staffId: ticket.staffId
    })) || [];

  return (
    <>
      <Typography.Title level={3}>Welcome Nurse</Typography.Title>

      {/* Active Queue Section */}
      <Card title="Active Queue Details" className={styles.card} style={{ marginBottom: 24 }}>
        {visitQueues && visitQueues.length > 0 ? (
          <>
            <p>
              <strong>Name:</strong> {visitQueues[0].name}
            </p>
            <p>
              <strong>Start Time:</strong>{' '}
              {new Date(visitQueues[0].startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong>{' '}
              {new Date(visitQueues[0].endTime).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {visitQueues[0].status === 1
                ? 'Open'
                : visitQueues[0].status === 2
                ? 'Paused'
                : 'Closed'}
            </p>
          </>
        ) : (
          <p>No active queue found</p>
        )}
      </Card>

      {/* Patient Queue Table */}
      <Card title="Today's Patient Queue" className={styles.card}>
        <Table columns={columns} dataSource={tableData} pagination={false} />
      </Card>
    </>
  );
};

export default NurseDashboard;
