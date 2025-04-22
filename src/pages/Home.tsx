import React, { useEffect, useState } from 'react';
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
  const [smallView, setSmallView] = useState(false);

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

  const sideNavItems: MenuProps['items'] = [
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

  // Collapse sidebar on small screens
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 800) {
      setCollapsed(true);
      setSmallView(true);
    } else {
      setCollapsed(false);
      setSmallView(false);
    }
  };

  handleResize(); // Initial check

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


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
  <div
    style={{
      height: 64,
      background: '#001529',
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-end',
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
      }}
    />
  </div>

  <Menu
    theme="dark"
    mode="inline"
    selectedKeys={[selectedTab]}
    onClick={({ key }) => setSelectedTab(key)}
    items={sideNavItems}
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
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: 'white',
                fontSize: 16,
                marginRight: 16,
              }}
            /> */}
          </div>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            {smallView ? "" : 'Logout'}
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
