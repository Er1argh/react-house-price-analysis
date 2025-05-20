import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.scss';

import MainLayout from '@components/layout/MainLayout';
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/react-house-price-analysis/">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
