"use client";
import React, { useContext, useEffect } from "react";
import { Modal, Card, Descriptions, Spin, Alert, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { PatientProfileStateContext, PatientProfileActionContext } from "@/providers/patient-provider/context";

interface PatientProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PatientProfileModal({ open, onClose }: PatientProfileModalProps) {
  const { profile, isPending, isError, error } = useContext(PatientProfileStateContext);
  const { getProfile } = useContext(PatientProfileActionContext);

  // Load profile when modal opens
  useEffect(() => {
    if (open && !profile) {
      getProfile();
    }
  }, [open]);

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <UserOutlined />
          My Profile
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
       
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={600}
    >
      {isPending ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>Loading profile...</p>
        </div>
      ) : isError ? (
        <Alert
          message="Error Loading Profile"
          description={error || "Failed to load patient profile"}
          type="error"
          showIcon
          action={
            <Button size="small">
              Retry
            </Button>
          }
        />
      ) : profile ? (
        <Card>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Full Name">
              {profile.name && profile.surname 
                ? `${profile.name} ${profile.surname}` 
                : profile.name || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Username">
              {profile.userName || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {profile.email || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Identity Number">
              {profile.identityNo || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Patient ID">
              {profile.id || "Not provided"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <Alert
          message="No Profile Data"
          description="No profile information available"
          type="info"
          showIcon
        />
      )}
    </Modal>
  );
}