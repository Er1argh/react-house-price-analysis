import React, { useState } from 'react';
import { Button, Card, Descriptions, List, Modal, Table, Tag } from 'antd';
import { ClearOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import useMediaQuery from '@hooks/useMediaQuery';

import { clearHistory } from '@store/slices/predictionSlice';

import type { HistoryItem } from 'types/history';

const HistoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.prediction);
  const [selectedRecord, setSelectedRecord] = useState<HistoryItem | null>(null);
  const isMobile = useMediaQuery('(max-width: 1000px)');

  const handleRowClick = (record: HistoryItem) => {
    setSelectedRecord(record);
  };

  const getDistrictName = (code: number) => {
    const districts = ['Центральный', 'Северный', 'Южный', 'Западный', 'Восточный', 'Зеленоградский', 'Новомосковский'];

    return districts[code - 1] || 'Неизвестный округ';
  };

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'timestamp',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Параметры',
      render: (_: unknown, record: HistoryItem) => (
        <div>
          <div>Общая: {record.params.totsp} м²</div>
          <div>Жилая: {record.params.livesp} м²</div>
          <Button
            type="link"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedRecord(record);
            }}>
            Посмотреть все
          </Button>
        </div>
      ),
    },
    {
      title: 'Результат',
      dataIndex: 'result',
      render: (value: number) => `${value} тыс.$`,
    },
  ];

  return (
    <>
      <Card title="История расчетов">
        {isMobile ? (
          <List
            dataSource={history}
            renderItem={(item) => (
              <List.Item onClick={() => setSelectedRecord(item)} actions={[`${item.result} тыс.$`]}>
                <List.Item.Meta
                  title={new Date(item.timestamp).toLocaleDateString()}
                  description={
                    <>
                      <div>Общая: {item.params.totsp} м²</div>
                      <div>Жилая: {item.params.livesp} м²</div>
                      <Button
                        type="link"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedRecord(item);
                        }}>
                        Посмотреть все
                      </Button>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Table
            dataSource={history}
            columns={columns}
            scroll={{ x: true }}
            pagination={{ pageSize: 5 }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            rowKey="timestamp"
          />
        )}
        {history.length > 0 && (
          <Button type="primary" size="middle" icon={<ClearOutlined />} danger onClick={() => dispatch(clearHistory())}>
            Очистить историю
          </Button>
        )}
      </Card>
      <Modal
        title="Детали расчета"
        open={!!selectedRecord}
        onCancel={() => setSelectedRecord(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedRecord(null)}>
            Закрыть
          </Button>,
        ]}>
        {selectedRecord && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Общая площадь">{selectedRecord.params.totsp} м²</Descriptions.Item>
            <Descriptions.Item label="Жилая площадь">{selectedRecord.params.livesp} м²</Descriptions.Item>
            <Descriptions.Item label="Площадь кухни">{selectedRecord.params.kitsp} м²</Descriptions.Item>
            <Descriptions.Item label="Расстояние от центра">{selectedRecord.params.dist} км</Descriptions.Item>
            <Descriptions.Item label="Расстояние до метро">{selectedRecord.params.metrdist} мин</Descriptions.Item>
            <Descriptions.Item label="Пешая доступность">{selectedRecord.params.walk ? 'Да' : 'Нет'}</Descriptions.Item>
            <Descriptions.Item label="Тип дома">
              {selectedRecord.params.brick ? 'Кирпичный' : 'Панельный'}
            </Descriptions.Item>
            <Descriptions.Item label="Этаж">
              {selectedRecord.params.floor ? 'Первый/последний' : 'Другой'}
            </Descriptions.Item>
            <Descriptions.Item label="Округ">{getDistrictName(selectedRecord.params.code!)}</Descriptions.Item>
            <Descriptions.Item label="Результат">
              <Tag color="blue">{selectedRecord.result} тыс.$</Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default HistoryList;
