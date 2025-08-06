'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  TeamOutlined,
  ProfileOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useStyles } from './Style/style';

const { Sider, Content } = Layout;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { styles } = useStyles();
  const router = useRouter();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      sessionStorage.clear();
      router.push('/login');
    } else {
      router.push(`/admin/${key}`);
    }
  };

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider} breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo}>CareLine Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          onClick={handleMenuClick}
          items={[
            { key: 'dashboard', icon: <AppstoreOutlined />, label: 'Dashboard' },
            { key: 'service-types', icon: <ProfileOutlined />, label: 'Service Types' },
            { key: 'staff', icon: <TeamOutlined />, label: 'Staff Management' },
            { key: 'queues', icon: <ProfileOutlined />, label: 'Visit Queues' },
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

export default AdminLayout;
