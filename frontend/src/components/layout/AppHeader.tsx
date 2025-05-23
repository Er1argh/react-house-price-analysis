import React from 'react';
import { Button, Layout, Typography } from 'antd';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';

import useMediaQuery from '@hooks/useMediaQuery';

const headerStyle: React.CSSProperties = {
  width: '100%',
  height: 70,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
};

const titleStyle: React.CSSProperties = {
  color: '#ffffff',
};

interface AppHeaderProps {
  onMenuOpen: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onMenuOpen }) => {
  const isMobile = useMediaQuery('(max-width: 1000px)');

  return (
    <Layout.Header style={headerStyle}>
      <Typography.Title level={4} style={titleStyle}>
        <HomeOutlined /> House Price Analysis
      </Typography.Title>
      {isMobile && (
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: '#ffffff', fontSize: '1.5rem' }} />}
          onClick={onMenuOpen}
        />
      )}
    </Layout.Header>
  );
};

export default AppHeader;
