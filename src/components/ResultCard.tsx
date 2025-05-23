import React from 'react';
import { Card, Progress, Result, Statistic } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import { useAppSelector } from '@hooks/redux';

import { getModelConfidence } from '@utils/calculatePrice';

const ResultCard: React.FC = () => {
  const { result, params } = useAppSelector((state) => state.prediction);
  const confidence = getModelConfidence(result!, params);

  return (
    <>
      <Card title="Результат прогноза" variant="borderless">
        {result !== null ? (
          <>
            <Statistic
              title="Предсказанная стоимость"
              value={result + ' тыс.'}
              precision={0}
              valueStyle={{ color: '#1890ff', fontSize: '2.5rem' }}
              suffix="$"
            />
            <Progress
              percent={confidence * 100}
              status={confidence > 0.6 ? 'success' : 'exception'}
              format={() => `${(confidence * 100).toFixed(0)}% доверия`}
              strokeColor={confidence > 0.7 ? '#52c41a' : '#ff4d4f'}
            />
          </>
        ) : (
          <Result
            icon={<CloseCircleOutlined />}
            title="Введите параметры квартиры"
            subTitle="Для получения прогноза стоимости заполните все поля формы"
          />
        )}
      </Card>
    </>
  );
};

export default ResultCard;
