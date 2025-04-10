import React, { useState } from 'react';
import {
  LogoutOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const { Header, Sider, Content } = Layout;

const Home: React.FC = () => {
  const { logout } = useAuth0();
  const [selectedTab, setSelectedTab] = useState('personal');
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const topNavItems: MenuProps['items'] = [
    {
      key: 'personal',
      icon: <UserOutlined />,
      label: 'Personal',
    },
    {
      key: 'career',
      icon: <LaptopOutlined />,
      label: 'Career',
    },
    {
      key: 'future',
      icon: <NotificationOutlined />,
      label: 'Future',
    },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'personal':
        return <div>👤 Personal section: hobbies, life, etc.</div>;
      case 'career':
        return <div>💼 Career section: work, projects, goals.</div>;
      case 'future':
        return <div>🚀 Future section: aspirations and plans.</div>;
      default:
        return <div>Welcome!</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: 64, background: '#001529', marginBottom: 8 }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[]}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            position: 'fixed',
            top: 0,
            left: collapsed ? 80 : 200,
            right: 0,
            zIndex: 100,
            height: 64,
            background: '#001529',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: 'white',
              fontSize: 16,
              marginRight: 24,
            }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedTab]}
            onClick={({ key }) => setSelectedTab(key)}
            items={topNavItems}
            style={{ flex: 1, background: 'transparent' }}
          />
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Header>

        <Content
          style={{
            marginTop: 64,
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 'calc(100vh - 64px)',
            overflow: 'auto',
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
