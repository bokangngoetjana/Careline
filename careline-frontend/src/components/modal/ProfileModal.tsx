"use client";
import React, { useContext, useEffect } from "react";
import { Modal, Card, Descriptions, Spin, Alert, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { PatientProfileStateContext, PatientProfileActionContext } from "@/providers/patient-provider/context";
import { useStyles } from "../../app/patient/Style/style";

interface PatientProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PatientProfileModal({ open, onClose }: PatientProfileModalProps) {
  const { profile, isPending, isError, error } = useContext(PatientProfileStateContext);
  const { getProfile } = useContext(PatientProfileActionContext);
  
  const { styles } = useStyles();

  // Load profile when modal opens
  useEffect(() => {
    if (open && !profile) {
      getProfile();
    }
  }, [open]);

  return (
    <Modal
      className={styles.profileModal}
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
        <div className={styles.profileLoadingContainer}>
          <Spin size="large" />
          <p>Loading profile...</p>
        </div>
      ) : isError ? (
        <Alert
          className={styles.profileErrorAlert}
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
        <Card className={styles.profileCard}>
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
          className={styles.profileInfoAlert}
          message="No Profile Data"
          description="No profile information available"
          type="info"
          showIcon
        />
      )}
    </Modal>
  );
}