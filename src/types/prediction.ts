export interface PredictionParams {
  totsp: number | null;
  livesp: number | null;
  kitsp: number | null;
  dist: number | null;
  metrdist: number | null;
  walk: 0 | 1 | null;
  brick: 0 | 1 | null;
  floor: 0 | 1 | null;
  code: 1 | 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
}
