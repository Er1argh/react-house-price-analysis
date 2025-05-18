import type { HistoryItem } from 'types/history';

export const loadHistory = (): HistoryItem[] => {
  try {
    const saved = localStorage.getItem('predictionHistory');

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return parsed.every(isHistoryItem) ? parsed : [];
  } catch {
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHistoryItem = (item: any): item is HistoryItem => {
  return typeof item?.result === 'number' && typeof item?.timestamp === 'string' && typeof item?.params === 'object';
};
