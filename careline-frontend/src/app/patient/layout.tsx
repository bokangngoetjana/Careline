"use client";
import React, { useState, useEffect} from "react";
import { Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  FormOutlined,
  ScheduleOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  { key: "1", icon: <HomeOutlined />, label: <Link href="/patient">Dashboard</Link> },
  { key: "2", icon: <FormOutlined />, label: <Link href="/patient/checkin">Check-In</Link> },
  { key: "3", icon: <ScheduleOutlined />, label: <Link href="/patient/queue">My Queue</Link> },
  { key: "4", icon: <SettingOutlined />, label: <Link href="/patient/settings">Settings</Link> },
  { key: "5", icon: <LogoutOutlined />, label: "Logout" },
];

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();
  const [patientName, setPatientName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/login");
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
          items={menuItems.map((item) =>
            item.key === "5"
              ? { ...item, onClick: handleLogout }
              : item
          )}
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
          <span style={{ fontWeight: "bold", color: "#292966" }}>Welcome, Patient</span>
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
    </Layout>
  );
}
