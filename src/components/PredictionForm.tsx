import React from 'react';
import { Button, Form, InputNumber, Select } from 'antd';
import { CalculatorOutlined, UndoOutlined } from '@ant-design/icons';

import type { PredictionParams } from 'types/prediction';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { addToHistory, reset, setResult, updateParams } from '@store/slices/predictionSlice';

import { calculatePrice } from '@utils/calculatePrice';

const inputNumberStyles: React.CSSProperties = {
  width: '100%',
};

const REQUIRED_FIELDS: (keyof PredictionParams)[] = [
  'totsp',
  'livesp',
  'kitsp',
  'dist',
  'metrdist',
  'walk',
  'brick',
  'floor',
  'code',
];

interface PredictionFormProps {
  onPredict?: () => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const dispatch = useAppDispatch();
  const { params } = useAppSelector((state) => state.prediction);
  const isFormValid = REQUIRED_FIELDS.every((field) => params[field] !== null);
  const hasParams = Object.values(params).some((val) => val !== null);

  const handlePredict = () => {
    const calculatedPrice = calculatePrice(params as Required<PredictionParams>);

    dispatch(setResult(calculatedPrice));
    dispatch(addToHistory());

    if (onPredict) {
      onPredict();
    }
  };

  const isFieldValid = (field: keyof PredictionParams) => params[field] !== null;

  return (
    <Form layout="vertical">
      <Form.Item required label="Общая площадь" validateStatus={isFieldValid('totsp') ? 'success' : 'error'}>
        <InputNumber
          style={inputNumberStyles}
          placeholder="Введите значение..."
          min={30}
          max={300}
          suffix="м²"
          value={params.totsp}
          onChange={(value) => dispatch(updateParams({ totsp: value ?? null }))}
        />
      </Form.Item>
      <Form.Item required label="Жилая площадь" validateStatus={isFieldValid('livesp') ? 'success' : 'error'}>
        <InputNumber
          style={inputNumberStyles}
          placeholder="Введите значение..."
          min={15}
          max={200}
          suffix="м²"
          value={params.livesp}
          onChange={(value) => dispatch(updateParams({ livesp: value ?? null }))}
        />
      </Form.Item>
      <Form.Item required label="Площадь кухни" validateStatus={isFieldValid('kitsp') ? 'success' : 'error'}>
        <InputNumber
          style={inputNumberStyles}
          placeholder="Введите значение..."
          min={5}
          max={50}
          suffix="м²"
          value={params.kitsp}
          onChange={(value) => dispatch(updateParams({ kitsp: value ?? null }))}
        />
      </Form.Item>
      <Form.Item required label="Расстояние от центра" validateStatus={isFieldValid('dist') ? 'success' : 'error'}>
        <InputNumber
          style={inputNumberStyles}
          placeholder="Введите значение..."
          min={1}
          max={30}
          suffix="км"
          value={params.dist}
          onChange={(value) => dispatch(updateParams({ dist: value ?? null }))}
        />
      </Form.Item>
      <Form.Item required label="Расстояние до метро" validateStatus={isFieldValid('metrdist') ? 'success' : 'error'}>
        <InputNumber
          style={inputNumberStyles}
          placeholder="Введите значение..."
          min={1}
          max={60}
          suffix="мин"
          value={params.metrdist}
          onChange={(value) => dispatch(updateParams({ metrdist: value ?? null }))}
        />
      </Form.Item>
      <Form.Item required label="Пешая доступность" validateStatus={isFieldValid('walk') ? 'success' : 'error'}>
        <Select
          placeholder="Выберите вариант..."
          onSelect={(value) => dispatch(updateParams({ walk: value }))}
          options={[
            { value: 0, label: 'Пешком до метро' },
            { value: 1, label: 'На транспорте' },
          ]}
        />
      </Form.Item>
      <Form.Item required label="Тип дома" validateStatus={isFieldValid('brick') ? 'success' : 'error'}>
        <Select
          placeholder="Выберите вариант..."
          onSelect={(value) => dispatch(updateParams({ brick: value }))}
          options={[
            { value: 0, label: 'Кирпичный' },
            { value: 1, label: 'Панельный ' },
          ]}
        />
      </Form.Item>
      <Form.Item required label="Этаж" validateStatus={isFieldValid('floor') ? 'success' : 'error'}>
        <Select
          placeholder="Выберите вариант..."
          onSelect={(value) => dispatch(updateParams({ floor: value }))}
          options={[
            { value: 0, label: 'Не первый/последний' },
            { value: 1, label: 'Первый/последний' },
          ]}
        />
      </Form.Item>
      <Form.Item required label="Расположение" validateStatus={isFieldValid('code') ? 'success' : 'error'}>
        <Select
          placeholder="Выберите вариант..."
          onSelect={(value) => dispatch(updateParams({ code: value }))}
          options={[
            { value: 1, label: 'Центральный округ' },
            { value: 2, label: 'Северный округ' },
            { value: 3, label: 'Южный округ' },
            { value: 4, label: 'Западный округ' },
            { value: 5, label: 'Восточный округ' },
            { value: 6, label: 'Зеленоградский округ' },
            { value: 7, label: 'Новомосковский округ' },
            { value: 8, label: 'Северный округ' },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          icon={<CalculatorOutlined />}
          block
          onClick={handlePredict}
          disabled={!isFormValid}>
          Предсказать цену
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          disabled={!hasParams}
          type="link"
          icon={<UndoOutlined />}
          danger
          size="large"
          block
          onClick={() => dispatch(reset())}>
          Сбросить параметры
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PredictionForm;
