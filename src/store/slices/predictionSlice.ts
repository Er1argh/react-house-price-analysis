import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { PredictionParams } from 'types/prediction';
import type { HistoryItem } from 'types/history';

import { loadHistory } from '@utils/loadHisotry';

interface PredictionState {
  params: PredictionParams;
  result: number | null;
  history: HistoryItem[];
}

const initialState: PredictionState = {
  params: {
    totsp: null,
    livesp: null,
    kitsp: null,
    dist: null,
    metrdist: null,
    walk: null,
    brick: null,
    floor: null,
    code: null,
  },
  result: null,
  history: loadHistory(),
};

export const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    updateParams: (state, action: PayloadAction<Partial<PredictionParams>>) => {
      state.params = { ...state.params, ...action.payload };
    },
    setResult: (state, action: PayloadAction<number>) => {
      state.result = action.payload;
    },
    reset: (state) => {
      state.params = initialState.params;
      state.result = null;
    },
    addToHistory: (state) => {
      if (state.result !== null) {
        const newItem: HistoryItem = {
          params: state.params,
          result: state.result,
          timestamp: new Date().toISOString(),
        };

        const newHistory = [newItem, ...state.history].slice(0, 50);

        state.history = newHistory;
        localStorage.setItem('predictionHistory', JSON.stringify(newHistory));
      }
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem('predictionHistory');
    },
  },
});

export const { updateParams, setResult, reset, addToHistory, clearHistory } = predictionSlice.actions;

export default predictionSlice.reducer;
