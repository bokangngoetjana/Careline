'use client';

import React from 'react';
import { Card, Typography, Button, Table, Tag } from 'antd';
import DashboardLayout from '../layout';
import { useStyles } from '../Style/style';

const DoctorDashboard: React.FC = () => {
  const { styles } = useStyles();

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
    <DashboardLayout>
      <Typography.Title level={3}>Welcome Doctor</Typography.Title>
      <Card title="Today's Patient Queue" className={styles.card}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
