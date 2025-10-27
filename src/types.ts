import type { CSSProperties } from "react";

export type MonthValue = Date | null;
export type MonthRangeValue = [MonthValue, MonthValue];

export interface MonthPreset {
  title: string;
  start: Date;
  end: Date;
}

export interface MonthPickerProps {
  onChange?: (dateRange: [Date, Date]) => void;
  value?: MonthRangeValue;
  presets?: MonthPreset[];
  style?: CSSProperties;
  closeDelay?: number;
  highlightCol?: string;
}
