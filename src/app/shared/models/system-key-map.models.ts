import { WritingSystemKeyCode } from './writing-system-key-code.models';

export type SystemKeyboardMap = Record<WritingSystemKeyCode, SystemKeyMap>;

export interface SystemKeyMap {
  value: string;
  withShift: string;
  withAltGr: string;
  withShiftAltGR: string;
}
