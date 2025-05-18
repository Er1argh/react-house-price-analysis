import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={
        <Link to="/">
          <Button type="primary">На главную</Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;
