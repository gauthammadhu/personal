import React from 'react';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';
import {
  Button,
  Card,
  Col,
  Row,
  Tooltip,
  Typography,
  Space
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Login() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    const options: LogoutOptions = {
      logoutParams: {
        returnTo: window.location.origin,
      },
    };
    logout(options);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #f0f2f5, #ffffff)',
        padding: '1rem',
      }}
    >
      <Col xs={22} sm={18} md={12} lg={8}>
        <Card
          bordered={false}
          style={{
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
          }}
          title={
            <Space>
              Sign In to My App
              <Tooltip title="This app is a study project to showcase skills. No data is stored.">
                <InfoCircleOutlined style={{ color: '#1890ff' }} />
              </Tooltip>
            </Space>
          }
        >
          <Title level={4} style={{ textAlign: 'center', marginBottom: 0 }}>
            Get to Know More About Me
          </Title>
          <Paragraph style={{ textAlign: 'center', marginBottom: 32 }}>
            — Gautham Madhu —
          </Paragraph>
          <Row justify="center">
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={isAuthenticated ? handleLogout : () => loginWithRedirect()}
            >
              {isAuthenticated ? 'Log Out' : 'Log In'}
            </Button>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
