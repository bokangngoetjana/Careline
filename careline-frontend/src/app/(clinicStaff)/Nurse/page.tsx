'use client';

import React, {useEffect} from 'react';
import { Card, Typography, Button, Table, Tag, Spin } from 'antd';
import { useStyles } from '../Style/style';
import { useVisitQueueActions, useVisitQueueState } from '@/providers/queue-provider';

const NurseDashboard: React.FC = () => {
  const { styles } = useStyles();
  const { getActiveVisitQueue } = useVisitQueueActions();
  const { visitQueues, isPending} = useVisitQueueState();

  useEffect(() => {
    getActiveVisitQueue();
  }, []);

  const data = [
    {
      key: '1',
      patient: 'John Doe',
      ticketNo: 12,
      symptoms: 'Fever, cough',
      status: 'Waiting',
    },
    {
      key: '2',
      patient: 'Jane Smith',
      ticketNo: 13,
      symptoms: 'Headache',
      status: 'In Progress',
    },
  ];

  const columns = [
    { title: 'Patient', dataIndex: 'patient', key: 'patient' },
    { title: 'Ticket No.', dataIndex: 'ticketNo', key: 'ticketNo' },
    { title: 'Symptoms', dataIndex: 'symptoms', key: 'symptoms' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'volcano';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="primary">Update Status</Button>,
    },
  ];

  return (
    <>
      <Typography.Title level={3}>Welcome Nurse</Typography.Title>
      {/* Active Queue Section */}
      <Card title="Active Queue Details" className={styles.card} style={{ marginBottom: 24 }}>
        {isPending ? (
          <Spin />
        ) : visitQueues && visitQueues.length > 0 ? (
          <>
            <p><strong>Name:</strong> {visitQueues[0].name}</p>
            <p><strong>Start Time:</strong> {new Date(visitQueues[0].startTime).toLocaleString()}</p>
            <p><strong>End Time:</strong> {new Date(visitQueues[0].endTime).toLocaleString()}</p>
            <p><strong>Status:</strong> {visitQueues[0].status === 1 ? 'Open' : visitQueues[0].status === 2 ? 'Paused' : 'Closed'}</p>
          </>
        ) : (
          <p>No active queue found</p>
        )}
      </Card>
      <Card title="Today's Patient Queue" className={styles.card}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </>
  );
};

export default NurseDashboard;
