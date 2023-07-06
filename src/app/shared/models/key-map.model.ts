import { Action } from './action.model';

export interface KeyMapping {
  keyMap: 'A1' | 'A2' | 'A3';
  index: number;
  action: Action | null;
}
