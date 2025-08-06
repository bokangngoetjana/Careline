"use client";
import React, { useState, useEffect} from "react";
import { Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  FormOutlined,
  ScheduleOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined, // Added for profile icon
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PatientProfileModal from "@/components/modal/ProfileModal"; // Import the modal

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  { key: "1", icon: <HomeOutlined />, label: <Link href="/patient">Dashboard</Link> },
  { key: "2", icon: <FormOutlined />, label: <Link href="/patient/checkin">Check-In</Link> },
  { key: "3", icon: <ScheduleOutlined />, label: <Link href="/patient/queue">My Queue</Link> },
  { key: "4", icon: <SettingOutlined />, label: <Link href="/patient/settings">Settings</Link> },
  { key: "6", icon: <FormOutlined />, label: <Link href="/patient/medical-history">Medical History</Link> },
  { key: "7", icon: <UserOutlined />, label: "My Profile" }, // Added profile menu item
  { key: "5", icon: <LogoutOutlined />, label: "Logout" },
];

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const [patientName, setPatientName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState(false); // Added state for profile modal
 
  useEffect(() => {
    const name = sessionStorage.getItem("userFullName");
    if(name)
      setPatientName(name);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  // Added function to handle profile menu click
  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 64,
            margin: 16,
            background: "#292966",
            borderRadius: 8,
            color: "white",
            textAlign: "center",
            lineHeight: "64px",
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          CareLine
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems.map((item) => {
            if (item.key === "5") {
              return { ...item, onClick: handleLogout };
            } else if (item.key === "7") { // Handle profile menu item
              return { ...item, onClick: handleProfileClick };
            }
            return item;
          })}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", color: "#292966" }}>Welcome, {patientName ?? "Patient"}</span>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          CareLine ©{new Date().getFullYear()}
        </Footer>
      </Layout>

      {/* Added Profile Modal */}
      <PatientProfileModal 
        open={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
      />
    </Layout>
  );
}