"use client";
import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

interface AddMedicalHistoryModalProps {
  open: boolean;
  onCancel: () => void;
  onSave: (values: any) => void;
  loading?: boolean;
}

export const AddMedicalHistoryModal: React.FC<AddMedicalHistoryModalProps> = ({
  open,
  onCancel,
  onSave,
  loading
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      form.resetFields();
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  return (
    <Modal
      title="Add Medical History"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Save & Complete"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="bloodPressure" label="Blood Pressure">
          <Input placeholder="e.g. 120/80" />
        </Form.Item>
        <Form.Item name="weight" label="Weight">
          <InputNumber placeholder="e.g. 70" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="dosage" label="Dosage">
          <Input placeholder="Dosage amount" />
        </Form.Item>
        <Form.Item name="medicationPrescribed" label="Medication">
          <Input placeholder="Medication name" />
        </Form.Item>
        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={3} placeholder="Additional notes" />
        </Form.Item>
        <Form.Item name="followUpInstructions" label="Follow-up Instructions">
          <Input.TextArea rows={2} placeholder="Follow-up advice" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

