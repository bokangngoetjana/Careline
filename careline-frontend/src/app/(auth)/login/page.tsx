"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Typography } from "antd";
import { useStyles } from "./Style/style"; 
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";
import { IUser } from "@/providers/auth-provider/context";
import Link from "next/link";

const { Title } = Typography;

const LoginPage = () => {
    const { styles } = useStyles();
    const { loginUser } = useAuthActions();
    const { isError } = useAuthState();

    const onFinish: FormProps<IUser>['onFinish'] = async (values) => {
        const newUser: IUser = {
            userNameOrEmailAddress: values.userNameOrEmailAddress,
            password: values.password
        };
        loginUser(newUser);
    };
    if(isError){
        return <div>Login Error</div>;
    }

    return(
        <div className={styles.container}>
      <div className={styles.card}>
        <Title level={3} className={styles.title}>
          Login to your Account
        </Title>

        <Form
          layout="vertical"
          className={styles.form}
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="userNameOrEmailAddress"
            rules={[
              { required: true, message: 'Please enter your email' }
            ]}
          >
            <Input
              size="large"
              placeholder="username or email"
              style={{ color: '#000000' }}
              prefix={<MailOutlined style={{ color: '#999', paddingRight: '0.5rem' }} />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Input.Password
              size="large"
              placeholder="••••••••"
              style={{ color: '#000000' }}
              prefix={<LockOutlined style={{ color: '#999', paddingRight: '0.5rem' }} />}
            />
          </Form.Item>

          <Form.Item>

         
              <Button htmlType="submit" type="primary" className={styles.submitBtn}>
                Login
              </Button>

          </Form.Item>
        </Form>

        <div className={styles.footerText}>
          Dont have an account?{' '}
          <Link href="/signup">
            <strong>Signup</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;