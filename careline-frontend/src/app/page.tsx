"use client";
import React from "react";
import { Button, Card, Typography, Row, Col } from "antd";
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  MedicineBoxOutlined, 
  TeamOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Paragraph } = Typography;

export default function Home() {
  const features = [
    {
      icon: <UserOutlined style={{ fontSize: '48px', color: '#292966' }} />,
      title: "Easy Registration",
      description: "Quick and simple patient registration process to get you started with healthcare management."
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: '48px', color: '#292966' }} />,
      title: "Queue Management",
      description: "Join queues digitally, track your position, and get real-time updates on wait times."
    },
    {
      icon: <MedicineBoxOutlined style={{ fontSize: '48px', color: '#292966' }} />,
      title: "Medical History",
      description: "Access your complete medical records and history from previous visits and treatments."
    },
    {
      icon: <TeamOutlined style={{ fontSize: '48px', color: '#292966' }} />,
      title: "Healthcare Staff Portal",
      description: "Dedicated portal for doctors and nurses to manage patients and queues efficiently."
    }
  ];

  const benefits = [
    "Reduce waiting times at healthcare facilities",
    "Digital ticket system with real-time updates",
    "Secure patient data management",
    "Easy appointment scheduling",
    "Comprehensive medical history tracking",
    "Mobile-friendly interface"
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #00D4FF 0%, #090979 100%)" }}>

      {/* Navigation */}
      <nav style={{ 
        padding: "16px 32px", 
        background: "rgba(255, 255, 255, 0.1)", 
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <Title level={2} style={{ color: "white", margin: 0, fontWeight: "bold" }}>
            CareLine
          </Title>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/login">
              <Button type="text" style={{ color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
                Sign In
              </Button>
            </Link>
            <Link href="/patient-signup">
              <Button type="primary" style={{ background: "#292966", borderColor: "#292966" }}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ padding: "80px 32px", textAlign: "center", color: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Title level={1} style={{ color: "white", fontSize: "56px", fontWeight: "bold", marginBottom: "24px" }}>
            Modern Healthcare
            <br />
            <span style={{ color: "#FFD700" }}>Queue Management</span>
          </Title>
          <Paragraph style={{ 
            fontSize: "20px", 
            color: "rgba(255,255,255,0.9)", 
            marginBottom: "40px",
            lineHeight: "1.6"
          }}>
            Streamline your healthcare experience with digital queue management, 
            real-time updates, and comprehensive medical record tracking.
          </Paragraph>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/patient-signup">
              <Button 
                type="primary" 
                size="large" 
                icon={<UserOutlined />}
                style={{ 
                  background: "#292966", 
                  borderColor: "#292966", 
                  height: "56px", 
                  padding: "0 32px",
                  fontWeight: "600"
                }}
              >
                Join as Patient
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                size="large" 
                icon={<TeamOutlined />}
                style={{ 
                  background: "rgba(255,255,255,0.1)", 
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                  height: "56px", 
                  padding: "0 32px",
                  fontWeight: "600"
                }}
              >
                Staff Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ 
        padding: "80px 32px", 
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Title level={2} style={{ textAlign: "center", color: "#292966", marginBottom: "60px" }}>
            Why Choose CareLine?
          </Title>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    border: "none",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    borderRadius: "16px",
                    height: "280px"
                  }}
                  bodyStyle={{ padding: "32px 24px" }}
                >
                  <div style={{ marginBottom: "24px" }}>
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ color: "#292966", marginBottom: "16px" }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: "#666", lineHeight: "1.6" }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{ 
        padding: "80px 32px", 
        background: "linear-gradient(135deg, #292966 0%, #1a1a4d 100%)",
        color: "white"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} style={{ color: "white", marginBottom: "32px" }}>
                Transform Your Healthcare Experience
              </Title>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {benefits.map((benefit, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <CheckCircleOutlined style={{ color: "#FFD700", fontSize: "20px" }} />
                    <span style={{ fontSize: "16px", lineHeight: "1.6" }}>{benefit}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "32px" }}>
                <Link href="/patient-signup">
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{ 
                      background: "#FFD700", 
                      borderColor: "#FFD700",
                      color: "#292966",
                      height: "48px",
                      fontWeight: "600"
                    }}
                  >
                    Start Your Journey
                  </Button>
                </Link>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "24px",
                padding: "48px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <MedicineBoxOutlined style={{ fontSize: "120px", color: "#FFD700", marginBottom: "24px" }} />
                <Title level={3} style={{ color: "white", marginBottom: "16px" }}>
                  Healthcare Made Simple
                </Title>
                <Paragraph style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
                  Join thousands of patients who have simplified their healthcare journey with CareLine.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ 
        padding: "40px 32px", 
        background: "#1a1a1a", 
        color: "white",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Title level={3} style={{ color: "white", marginBottom: "16px" }}>
            CareLine
          </Title>
          <Paragraph style={{ color: "#999", marginBottom: "24px" }}>
            Streamlining healthcare through innovative queue management solutions.
          </Paragraph>
          <Paragraph style={{ color: "#666", fontSize: "14px" }}>
            © {new Date().getFullYear()} CareLine. All rights reserved.
          </Paragraph>
        </div>
      </footer>
    </div>
  );
}