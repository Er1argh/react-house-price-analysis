import type { PredictionParams } from './prediction';

export interface HistoryItem {
  params: PredictionParams;
  result: number;
  timestamp: string;
}
