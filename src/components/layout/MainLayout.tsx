import React, { useState } from 'react';
import { Drawer, Layout } from 'antd';

import useMediaQuery from '@hooks/useMediaQuery';

import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';

const MainLayout: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1000px)');

  const handleSuccessfulPredict = () => {
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  return (
    <Layout>
      <AppHeader onMenuOpen={() => setDrawerVisible(true)} />
      <Layout>
        {!isMobile && <AppSider />}
        <Drawer
          title="Параметры квартиры"
          placement="left"
          width={300}
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          styles={{ body: { padding: '1rem' } }}>
          <AppSider mobileView onPredict={handleSuccessfulPredict} />
        </Drawer>
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
