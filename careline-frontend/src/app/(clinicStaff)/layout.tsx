'use client';

import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useStyles } from './Style/style';

const { Header, Content, Sider } = Layout;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { styles } = useStyles();
  const router = useRouter();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      sessionStorage.clear();
      router.push('/login');
    } else {
      router.push(`/doctor/${key}`); // For nurse, change `/doctor/` to `/nurse/`
    }
  };

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider} breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo}>CareLine</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          onClick={handleMenuClick}
          items={[
            { key: 'dashboard', icon: <UserOutlined />, label: 'Dashboard' },
            { key: 'tickets', icon: <FileTextOutlined />, label: 'Patient Tickets' },
            { key: 'queue', icon: <TeamOutlined />, label: 'Visit Queue' },
            { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
          ]}
        />
      </Sider>

        <Content className={styles.content}>
          {children}
        </Content>
    </Layout>
  );
};

export default DashboardLayout;
