"use client";
import React, { useEffect} from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Typography, message } from "antd";
import { useStyles } from "./Style/style";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";
import { IUser } from "@/providers/auth-provider/context";
import Link from "next/link";

const { Title } = Typography;

const LoginPage = () => {
  const { styles } = useStyles();
  const { loginUser } = useAuthActions();
  const { isError, isPending } = useAuthState();

  const onFinish: FormProps<IUser>['onFinish'] = async (values) => {
    const newUser: IUser = {
      userNameOrEmailAddress: values.userNameOrEmailAddress,
      password: values.password
    };
      await loginUser(newUser);
  };
useEffect(() => {
  if (isError) {
    console.log("Login error detected — showing toast");
    message.error("Login failed. Please check your credentials and try again.");
  }
}, [isError]);


  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <h1>Welcome to CareLine</h1>
        <p>
          Log in to manage patient queues, view tickets, and ensure a smooth
          clinic workflow. Fast, efficient, and always available.
        </p>
      </div>

      <div className={styles.rightPane}>
        <div className={styles.formWrapper}>
          <Title level={3} className={styles.title}>
            Login to your Account
          </Title>

          <Form
            layout="vertical"
            className={styles.form}
            onFinish={onFinish}
            requiredMark={false}
            disabled={isPending}
          >
            <Form.Item
              name="userNameOrEmailAddress"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                size="large"
                placeholder="Username or Email"
                style={{ color: "#000000" }}
                prefix={
                  <MailOutlined style={{ color: "#999", paddingRight: "0.5rem" }} />
                }
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                size="large"
                placeholder="••••••••"
                style={{ color: "#000000" }}
                prefix={
                  <LockOutlined style={{ color: "#999", paddingRight: "0.5rem" }} />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" className={styles.submitBtn} loading={isPending}>
                 {isPending ? "Logging in..." : "Login"} 
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.footerText}>
            Don’t have an account?{" "}
            <Link href="/patient-signup">
              <strong>Signup</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
