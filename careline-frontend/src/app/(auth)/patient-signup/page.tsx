"use client";
import React, { useContext } from "react";
import { Form, Input, Button, Card, Typography, Select, message } from "antd";
import { UserAddOutlined, MailOutlined, LockOutlined, UserOutlined, IdcardOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";

const { Title, Text } = Typography;
const { Option } = Select;

export default function PatientSignupPage() {
  const [form] = Form.useForm();
  const { isPending } = useAuthState();
  const { registerPatient } = useAuthActions();

  const onFinish = async (values: any) => {
    const payload = {
      id: "00000000-0000-0000-0000-000000000000",
      name: values.name,
      surname: values.surname,
      identityNo: parseInt(values.identityNo),
      userName: values.userName,
      email: values.email,
      password: values.password,
      gender: parseInt(values.gender)
    };

    await registerPatient(payload);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 500,
          margin: "0 16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={2} style={{ color: "#292966", marginBottom: 8 }}>
            Patient Registration
          </Title>
          <Text type="secondary">Join CareLine to manage your healthcare</Text>
        </div>

        <Form
          form={form}
          name="patient_registration"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          disabled={isPending}
        >
          <Form.Item
            name="name"
            label="First Name"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your first name"
            />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your last name"
            />
          </Form.Item>

          <Form.Item
            name="userName"
            label="Username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Choose a username"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Enter your email address"
            />
          </Form.Item>

          <Form.Item
            name="identityNo"
            label="Identity Number"
            rules={[{ required: true, message: 'Please enter your identity number' }]}
          >
            <Input 
              prefix={<IdcardOutlined />} 
              placeholder="Enter your identity number"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select your gender' }]}
          >
            <Select placeholder="Select your gender">
              <Option value={1}>Male</Option>
              <Option value={2}>Female</Option>
              <Option value={3}>Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Enter a strong password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              block
              size="large"
              icon={<UserAddOutlined />}
              style={{
                backgroundColor: "#292966",
                borderColor: "#292966",
                height: 48,
                fontWeight: "600"
              }}
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text type="secondary">
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#292966", fontWeight: "500" }}>
                Sign in here
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}