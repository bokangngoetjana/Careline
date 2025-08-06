'use client';
import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Table, Space, Modal, Form, Input, Select, Popconfirm, message, Spin } from 'antd';
import { useStyles } from '../Style/style';
import { axiosInstance } from '@/utils/axiosInstance';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useVisitQueueActions, useVisitQueueState } from '@/providers/queue-provider';
import { useStaffProfileActions, useStaffProfileState } from '@/providers/staff-provider';
import { useTicketActions, useTicketState } from '@/providers/ticket-provider';

const { Option } = Select;

const AdminDashboard: React.FC = () => {
  const { styles } = useStyles();
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : '';

  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'serviceTypes' | 'staff' | 'queues'>('serviceTypes');

  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [form] = Form.useForm();

  const { getStaff, createStaff, updateStaff, deleteStaff } = useStaffProfileActions();
  const { staffList } = useStaffProfileState();
  const { tickets, isPending } = useTicketState();
  const { getAllTickets } = useTicketActions();

  // ---- Visit Queue provider hooks ----
  const { getVisitQueues, createVisitQueue, updateVisitQueue, deleteVisitQueue } = useVisitQueueActions();
  const { visitQueues } = useVisitQueueState();

  useEffect(() => {
    getAllTickets();
  }, []);

  // ---- FETCH ----
  const fetchServiceTypes = async () => {
    try {
      const { data } = await axiosInstance.get('/services/app/ServiceType/GetAll', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const items = Array.isArray(data.result) ? data.result : data.result?.items || [];
      setServiceTypes(items);
    } catch {
      message.error('Failed to fetch service types');
    }
  };

  const fetchStaff = async () => {
    try {
      const { data } = await axiosInstance.get('/services/app/Staff/GetAll', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const items = Array.isArray(data.result) ? data.result : data.result?.items || [];
      setStaff(items);
    } catch {
      message.error('Failed to fetch staff');
    }
  };
  const fetchStaffList = async () => {
  await getStaff();
};

  const fetchQueues = async () => {
    try {
      await getVisitQueues();
    } catch {
      message.error('Failed to fetch queues');
    }
  };

  useEffect(() => {
    if (activeTab === 'serviceTypes') fetchServiceTypes();
    if (activeTab === 'staff') fetchStaff();
    if (activeTab === 'queues') fetchQueues();
  }, [activeTab]);

  // ---- SAVE ----
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const headers = { Authorization: `Bearer ${token}` };

      if (activeTab === 'serviceTypes') {
        if (editRecord) {
          await axiosInstance.put('/services/app/ServiceType/Update', { ...editRecord, ...values }, { headers });
          message.success('Service type updated');
        } else {
          await axiosInstance.post('/services/app/ServiceType/Create', values, { headers });
          message.success('Service type created');
        }
        fetchServiceTypes();
      }

     if (activeTab === 'staff') {
       const values = await form.validateFields();

        // Prepare payload exactly as Swagger expects
        const payload = {
            name: values.name?.trim(),
            surname: values.surname?.trim(),
            identityNo: Number(values.identityNo), // int
            email: values.email?.trim(),
            employeeNo: values.employeeNo?.trim(),
            roleName: values.roleName, // Doctor/Nurse
            gender: Number(values.gender), // 1, 2, or 3 (matching your enum)
            userName: values.userName?.trim(),
            password: values.password, // keep as is
        };
        console.log("Sending staff payload:", payload);

  // Ensure all required fields are there
  const missingFields = Object.entries(payload)
    .filter(([_, v]) => v === undefined || v === null || v === "")
    .map(([k]) => k);

  if (missingFields.length > 0) {
    message.error(`Missing required fields: ${missingFields.join(", ")}`);
    return;
}
       if (editRecord) {
        await updateStaff({ ...editRecord, ...payload });
        message.success('Staff updated');
      } else {
        await createStaff(payload);
        message.success('Staff created');
      }
    }
      if (activeTab === 'queues') {
        if (editRecord) {
          await updateVisitQueue({ ...editRecord, ...values });
          message.success('Queue updated');
        } else {
          await createVisitQueue(values);
          message.success('Queue created');
        }
      }

      setModalOpen(false);
      form.resetFields();
      setEditRecord(null);
    } catch (err) {
      console.error(err);
      message.error('Failed to save changes');
    }
  };

  // ---- DELETE ----
  const handleDelete = async (record: any) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (activeTab === 'serviceTypes') {
        await axiosInstance.delete(`/services/app/ServiceType/Delete?id=${record.id}`, { headers });
        fetchServiceTypes();
      }

      if (activeTab === 'staff') {
        await deleteStaff(record.id);
      }

      if (activeTab === 'queues') {
        await deleteVisitQueue(record.id);
      }

      message.success('Deleted successfully');
    } catch {
      message.error('Failed to delete');
    }
  };
  const ticketColumns = [
    { title: "Ticket #", dataIndex: "queueNumber" },
    { title: "Patient ID", dataIndex: "patientId" },
    { title: "Staff ID", dataIndex: "staffId" },
    { title: "Queue ID", dataIndex: "queueId" },
    { title: "Service Type ID", dataIndex: "serviceTypeId" },
    { title: "Symptoms", dataIndex: "symptoms" },
    { title: "Status", dataIndex: "status" },
    { title: "Check-in Time", dataIndex: "checkInTime" },
  ];
  const columns = {
    serviceTypes: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Description', dataIndex: 'description' },
      {
        title: 'Actions',
        render: (_: any, record: any) => (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => { setEditRecord(record); form.setFieldsValue(record); setModalOpen(true); }} />
            <Popconfirm title="Delete?" onConfirm={() => handleDelete(record)}>
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        )
      }
    ],
    staff: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Surname', dataIndex: 'surname' },
      { title: 'Role', dataIndex: 'roleName' },
      {
        title: 'Actions',
        render: (_: any, record: any) => (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => { setEditRecord(record); form.setFieldsValue(record); setModalOpen(true); }} />
            <Popconfirm title="Delete?" onConfirm={() => handleDelete(record)}>
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        )
      }
    ],
    queues: [
      { title: 'Queue Name', dataIndex: 'name' },
      { title: 'Start Time', dataIndex: 'startTime' },
      { title: 'End Time', dataIndex: 'endTime' },
      { title: 'Status', dataIndex: 'status' },
      {
        title: 'Actions',
        render: (_: any, record: any) => (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => { setEditRecord(record); form.setFieldsValue(record); setModalOpen(true); }} />
            <Popconfirm title="Delete?" onConfirm={() => handleDelete(record)}>
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        )
      }
    ]
  };

  return (
    <>
      <Typography.Title level={3}>Admin Dashboard</Typography.Title>

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditRecord(null); form.resetFields(); setModalOpen(true); }}>
          Add {activeTab === 'serviceTypes' ? 'Service Type' : activeTab === 'staff' ? 'Staff' : 'Queue'}
        </Button>
        <Space style={{ marginLeft: 16 }}>
          <Button onClick={() => setActiveTab('serviceTypes')}>Service Types</Button>
          <Button onClick={() => setActiveTab('staff')}>Staff</Button>
          <Button onClick={() => setActiveTab('queues')}>Visit Queues</Button>
        </Space>
      </div>

      <Card className={styles.card}>
        <Table
          rowKey="id"
          dataSource={activeTab === 'serviceTypes' ? serviceTypes : activeTab === 'staff' ? staff : visitQueues || []}
          columns={columns[activeTab]}
        />
      </Card>
       {/* All Tickets Table */}
      <Card style={{ marginTop: 32 }}>
        <Typography.Title level={4}>All Tickets</Typography.Title>
        {isPending ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={tickets || []}
            columns={ticketColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            bordered
          />
        )}
      </Card>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        title={editRecord ? 'Edit Record' : 'Add New'}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          {activeTab === 'serviceTypes' && (
            <>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea />
              </Form.Item>
            </>
          )}
          {activeTab === 'staff' && (
            <>
              <Form.Item name="name" label="First Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="surname" label="Surname" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="identityNo" label="Identity No" rules={[{ required: true }]}>
      <Input type="number" />
    </Form.Item>
    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
      <Input />
    </Form.Item>
    <Form.Item name="employeeNo" label="Employee No" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="roleName" label="Role" rules={[{ required: true }]}>
      <Select>
        <Option value="Doctor">Doctor</Option>
        <Option value="Nurse">Nurse</Option>
      </Select>
    </Form.Item>
    <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
      <Select>
        <Option value={1}>Male</Option>
        <Option value={2}>Female</Option>
        <Option value={3}>Other</Option>
      </Select>
    </Form.Item>
    <Form.Item name="userName" label="Username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
      <Input.Password />
    </Form.Item>
            </>
          )}
          {activeTab === 'queues' && (
            <>
              <Form.Item name="name" label="Queue Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="startTime" label="Start Time" rules={[{ required: true }]}>
                <Input type="datetime-local" />
              </Form.Item>
              <Form.Item name="endTime" label="End Time" rules={[{ required: true }]}>
                <Input type="datetime-local" />
              </Form.Item>
              <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                <Select>
                  <Option value={0}>Open</Option>
                  <Option value={1}>Closed</Option>
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AdminDashboard;
