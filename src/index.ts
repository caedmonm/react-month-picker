import MonthPickerComponent from "./MonthPicker";

// Default export for easier imports
export default MonthPickerComponent;

// Named export for backwards compatibility
export { default as MonthPicker } from "./MonthPicker";

// Export all types
export type {
  MonthValue,
  MonthRangeValue,
  MonthPreset,
  MonthPickerProps,
} from "./types";
