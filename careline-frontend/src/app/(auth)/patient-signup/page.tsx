'use client';

import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Typography, Select } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, IdcardOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { useStyles } from './Style/style';
import { useAuthActions, useAuthState } from '@/providers/auth-provider';
import { IUser } from '@/providers/auth-provider/context';
import Link from 'next/link';

const { Option } = Select;

enum GenderEnum {
    Male = 1,
    Female,
    Other
}

const PatientSignUp: React.FC = () => {
    const { styles } = useStyles();
    const { registerPatient } = useAuthActions();
    const { isError } = useAuthState();

    if(isError)
        return <div>Error registering patient</div>;

    const onFinish: FormProps<IUser>['onFinish'] = (values) => {
    const newUser: IUser = {
      name: values.name,
      surname: values.surname,
      userName: values.userName,
      email: values.email,
      password: values.password,
      identityNo: Number(values.identityNo), 
      gender: values.gender,
      roleName: 'Patient'
    };

    registerPatient(newUser);
  };
  const onFinishFailed: FormProps<IUser>['onFinishFailed'] = (error) => {
    console.log('Failed: ', error);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.decorativeCircle} ${styles.circleTopLeft}`} />
      <div className={`${styles.decorativeCircle} ${styles.circleBottomRight}`} />

      <Form
        name="patientSignup"
        className={styles.formWrapper}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography className={styles.brandName}>CareLine</Typography>
        <Typography className={styles.title}>Patient Sign Up</Typography>

        <Form.Item<IUser>
          name="name"
          rules={[{ required: true, message: 'Please input your first name' }]}
          className={styles.formItem}
        >
          <Input placeholder="First Name" className={styles.input} prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item<IUser>
          name="surname"
          rules={[{ required: true, message: 'Please input your surname' }]}
          className={styles.formItem}
        >
          <Input placeholder="Surname" className={styles.input} prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item<IUser>
          name="userName"
          rules={[{ required: true, message: 'Please choose a username' }]}
          className={styles.formItem}
        >
          <Input placeholder="Username" className={styles.input} prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item<IUser>
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          className={styles.formItem}
        >
          <Input placeholder="Email" className={styles.input} prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item<IUser>
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
          className={styles.formItem}
        >
          <Input.Password placeholder="Password" className={styles.input} prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item<IUser>
          name="identityNo"
          rules={[{ required: true, message: 'Please enter your ID number' }]}
          className={styles.formItem}
        >
          <Input placeholder="Identity Number" className={styles.input} prefix={<IdcardOutlined />} />
        </Form.Item>

        <Form.Item<IUser>
          name="gender"
          rules={[{ required: true, message: 'Please select your gender' }]}
          className={styles.formItem}
        >
          <Select placeholder="Select Gender" className={styles.input}>
            <Option value={GenderEnum.Male}>
              <ManOutlined /> Male
            </Option>
            <Option value={GenderEnum.Female}>
              <WomanOutlined /> Female
            </Option>
            <Option value={GenderEnum.Other}>Other</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submitButton}>
            Sign Up
          </Button>
        </Form.Item>

        <Link href="/login">
          <Typography className={styles.linkText}>Already have an account? Login</Typography>
        </Link>
      </Form>
    </div>
  );
}
export default PatientSignUp;