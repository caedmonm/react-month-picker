import type { CSSProperties, FC } from "react";

/** A single month value (or null when not selected). */
export type MonthValue = Date | null;

/** Range selected in the UI (month-precision, represented by Date objects). */
export type MonthRangeValue = [MonthValue, MonthValue];

/** Preset definition (uses native Date objects). */
export interface MonthPreset {
  title: string;
  start: Date;
  end: Date;
}

/**
 * Change handler fired by the MonthPicker.
 * Emits normalized ISO strings (start-of-month / end-of-month) or nulls.
 */
export type MonthPickerChangeHandler = (
  range: [string | null, string | null]
) => void;

/** Props for the MonthPicker component. */
export interface MonthPickerProps {
  onChange?: MonthPickerChangeHandler;
  value?: MonthRangeValue;
  presets?: MonthPreset[];
  style?: CSSProperties;
  closeDelay?: number;
  highlightCol?: string;
}

/** Type for the <MonthPicker> component. */
export type MonthPickerComponent = FC<MonthPickerProps>;
