import type dayjs from "dayjs";
import type { CSSProperties } from "react";
type DayjsInput = dayjs.Dayjs | Date | string | null;

export type MonthRangeValue = [DayjsInput | null, DayjsInput | null];

export interface MonthPreset {
  title: string;
  start: DayjsInput;
  end: DayjsInput;
}

export type MonthPickerChangeHandler = (
  range: [string | null, string | null]
) => void;

export interface MonthPickerProps {
  onChange?: MonthPickerChangeHandler;
  value?: MonthRangeValue;
  presets?: MonthPreset[];
  style?: CSSProperties;
  closeDelay?: number;
  highlightCol?: string;
}
