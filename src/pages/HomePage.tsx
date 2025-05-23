import React from 'react';
import { Typography } from 'antd';

import ResultCard from '@components/ResultCard';
import HistoryList from '@components/HistoryList';

const HomePage: React.FC = () => {
  return (
    <>
      <Typography.Title level={2}>Калькулятор стоимости квартир</Typography.Title>
      <ResultCard />
      <HistoryList />
    </>
  );
};

export default HomePage;
