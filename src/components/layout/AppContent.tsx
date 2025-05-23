import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 70px)',
  padding: '1rem',
  backgroundColor: '#f0f2f5',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const AppContent: React.FC = () => {
  return (
    <Layout.Content style={contentStyle}>
      <Outlet />
    </Layout.Content>
  );
};

export default AppContent;
