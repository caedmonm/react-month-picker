import type { ComponentType, CSSProperties } from "react";
import type { MomentInput } from "moment";

export type MonthRangeValue = [MomentInput | null, MomentInput | null];

export interface MonthPreset {
  title: string;
  start: MomentInput;
  end: MomentInput;
}

export type MonthPickerChangeHandler = (range: [string | null, string | null]) => void;

export interface MonthPickerProps {
  onChange?: MonthPickerChangeHandler;
  value?: MonthRangeValue;
  presets?: MonthPreset[];
  style?: CSSProperties;
  closeDelay?: number;
  highlightCol?: string;
}

export declare const MonthPicker: ComponentType<MonthPickerProps>;

export default MonthPicker;
