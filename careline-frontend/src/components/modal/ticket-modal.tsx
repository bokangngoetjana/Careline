"use client";
import React, { useEffect, useState, useContext } from "react";
import { Modal, Form, Select, Input, Button } from "antd";
import { TicketActionContext } from "@/providers/ticket-provider/context";
import {
  ServiceTypeActionContext,
  ServiceTypeStateContext
} from "@/providers/serviceType-Provider/context";
import {
  VisitQueueActionContext,
  VisitQueueStateContext
} from "@/providers/queue-provider/context";

const { TextArea } = Input;

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TicketModal({ open, onClose }: TicketModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Actions
  const { createTicket } = useContext(TicketActionContext);
  const { getServiceType } = useContext(ServiceTypeActionContext);
  const { getVisitQueues } = useContext(VisitQueueActionContext);

  // State
  const { serviceTypes } = useContext(ServiceTypeStateContext);
  const { visitQueues } = useContext(VisitQueueStateContext);

  // Fetch queues & services when modal opens
  useEffect(() => {
    if (open) {
      getVisitQueues?.();
      getServiceType?.();
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const patientId = sessionStorage.getItem("patientId");

      if (!patientId) {
        console.error("No patientId found");
        return;
      }

      await createTicket({
        patientId,
        queueId: values.queueId,
        serviceTypeId: values.serviceTypeId,
        symptoms: values.symptoms
      });

      form.resetFields();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Join Queue"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Form layout="vertical" form={form}>
        {/* Queue Select */}
        <Form.Item
          label="Select Queue"
          name="queueId"
          rules={[{ required: true, message: "Please select a queue" }]}
        >
          <Select placeholder="Select a queue">
            {visitQueues?.map((q) => (
              <Select.Option key={q.id} value={q.id}>
                {q.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Service Type Select */}
        <Form.Item
          label="Select Service Type"
          name="serviceTypeId"
          rules={[{ required: true, message: "Please select a service type" }]}
        >
          <Select placeholder="Choose a service type">
            {serviceTypes?.map((s) => (
              <Select.Option key={s.id} value={s.id}>
                {s.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Symptoms */}
        <Form.Item
          label="Symptoms"
          name="symptoms"
          rules={[{ required: true, message: "Please enter your symptoms" }]}
        >
          <TextArea rows={3} placeholder="Describe your symptoms" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            style={{ backgroundColor: "#292966", borderColor: "#292966" }}
            loading={loading}
            onClick={handleSubmit}
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
