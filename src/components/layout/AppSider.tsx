import React from 'react';
import { Card, Layout, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import PredictionForm from '../PredictionForm';

interface AppSiderProps {
  mobileView?: boolean;
  onPredict?: () => void;
}

const AppSider: React.FC<AppSiderProps> = ({ mobileView, onPredict }) => {
  const siderStyle: React.CSSProperties = {
    padding: mobileView ? 0 : '1rem',
    backgroundColor: '#f0f2f5',
    height: mobileView ? '100%' : 'auto',
  };

  return (
    <Layout.Sider width={mobileView ? '100%' : '25%'} style={siderStyle} collapsedWidth={0}>
      <Card
        title="Введите параметры"
        extra={
          <Tooltip title="Введите информацию о интересующей квартире, чтобы модель могла спрогнозировать цену">
            <QuestionCircleOutlined />
          </Tooltip>
        }>
        <PredictionForm onPredict={onPredict} />
      </Card>
    </Layout.Sider>
  );
};

export default AppSider;
