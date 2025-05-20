import type { PredictionParams } from 'types/prediction';

import { MINIMAL_PRICE, MODEL_CONFIDENCE, RMSE, TRAINING_RANGES } from './constants';

export const calculatePrice = (params: PredictionParams): number => {
  const coefficients = {
    intercept: -28.16638781693841,
    totsp: 1.59382,
    livesp: 1.426083,
    kitsp: 1.700464,
    dist: -3.044425,
    metrdist: -1.259431,
    walk: 10.115134,
    brick: 6.180242,
    floor: 6.539393,
    code: -2.788006,
  };

  const rawPrice = Math.round(
    coefficients.intercept +
      params.totsp! * coefficients.totsp +
      params.livesp! * coefficients.livesp +
      params.kitsp! * coefficients.kitsp +
      params.dist! * coefficients.dist +
      params.metrdist! * coefficients.metrdist +
      params.walk! * coefficients.walk +
      params.brick! * coefficients.brick +
      params.floor! * coefficients.floor +
      params.code! * coefficients.code,
  );

  return Math.max(rawPrice, MINIMAL_PRICE);
};

const calculateDataQuality = (params: PredictionParams) => {
  let score = 0;

  (Object.entries(params) as Array<[keyof typeof TRAINING_RANGES, number | null]>).forEach(([key, value]) => {
    if (value === null) {
      return;
    }

    const [min, max] = TRAINING_RANGES[key];

    if (value >= min && value <= max) {
      score += 1;
    }
  });

  return score / Object.keys(params).length;
};

export const getModelConfidence = (prediction: number, params: PredictionParams) => {
  const baseConfidence = MODEL_CONFIDENCE;
  const dataQuality = calculateDataQuality(params);
  const intervalConfidence = 1 - (1.96 * RMSE) / prediction;

  return 0.4 * baseConfidence + 0.3 * dataQuality + 0.3 * intervalConfidence;
};
