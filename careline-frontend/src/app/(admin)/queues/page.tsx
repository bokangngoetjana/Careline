"use client";

import React, { useEffect, useState } from "react";
import { Table, Input, Tag, Spin, Card } from "antd";
import { useVisitQueueActions, useVisitQueueState } from "@/providers/queue-provider";
import type { TableColumnsType } from "antd";

interface IVisitQueue {
  id?: string;
  name: string;
  startTime: string;
  endTime: string;
  status: number; // 1 = Open, 3 = Closed
}

export default function AdminQueuesPage() {
  const { getVisitQueues } = useVisitQueueActions();
  const { visitQueues } = useVisitQueueState();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchQueues = async () => {
      setLoading(true);
      try {
        await getVisitQueues();
      } finally {
        setLoading(false);
      }
    };
    fetchQueues();
  }, [getVisitQueues]);

  const filteredQueues = (visitQueues || []).filter((q: IVisitQueue) =>
    q.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: TableColumnsType<IVisitQueue> = [
    {
      title: "Queue Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        if (status === 1) return <Tag color="green">Open</Tag>;
        if (status === 3) return <Tag color="red">Closed</Tag>;
        return <Tag color="default">Unknown</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Card
        title={<span style={{ color: "#FFD700" }}>All Queues</span>}
        style={{
          background: "linear-gradient(135deg, #00D4FF 0%, #090979 100%)",
          borderRadius: 12,
        }}
        bodyStyle={{ background: "#fff", borderRadius: 8 }}
      >
        <Input.Search
          placeholder="Search queues..."
          allowClear
          style={{ marginBottom: 16 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <Spin />
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Table<IVisitQueue>
              columns={columns}
              dataSource={filteredQueues}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: "max-content" }}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
