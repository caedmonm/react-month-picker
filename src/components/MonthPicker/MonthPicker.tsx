import React, { useEffect, useMemo, useState } from "react";
import Selector from "./Selector/Selector";
import type {
  MonthPickerProps,
  MonthRangeValue,
  MonthPreset,
} from "./MonthPicker.types";

const DEFAULT_TITLE = "No dates selected";

// --- Utility functions ---

const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const getStartOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const getEndOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

const formatMonthYear = (date: Date): string => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
  }).format(date);
};

// --- Core logic ---
const isMatchingPreset = (
  preset: MonthPreset,
  value: MonthRangeValue
): boolean => {
  const [start, end] = value;

  if (start === null || end === null) {
    return false;
  }

  const matchesStart = isSameMonth(preset.start, start);
  const matchesEnd = isSameMonth(preset.end, end);

  return matchesStart && matchesEnd;
};

const formatRangeTitle = (range: MonthRangeValue): string => {
  const [start, end] = range;

  if (!start || !end) {
    return DEFAULT_TITLE;
  }

  return `${formatMonthYear(start)} - ${formatMonthYear(end)}`;
};

const MonthPicker: React.FC<MonthPickerProps> = ({
  onChange,
  value,
  presets,
  style,
  closeDelay,
  highlightCol,
}) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);

  const presetLookup = useMemo(() => presets ?? [], [presets]);

  const updateTitle = (range: MonthRangeValue | null) => {
    if (!range || range.length < 2) {
      setTitle(DEFAULT_TITLE);
      return;
    }

    const matchingPreset =
      presetLookup.length > 0
        ? presetLookup.find((preset) => isMatchingPreset(preset, range)) ?? null
        : null;

    if (matchingPreset) {
      setTitle(matchingPreset.title);
      return;
    }

    setTitle(formatRangeTitle(range));
  };

  useEffect(() => {
    updateTitle(value ?? null);
  }, [value, presetLookup]);

  const localChange = (range: MonthRangeValue) => {
    updateTitle(range);

    if (typeof onChange === "function") {
      const [start, end] = range;
      onChange([
        start === null ? null : getStartOfMonth(start).toISOString(),
        end === null ? null : getEndOfMonth(end).toISOString(),
      ]);
    }

    const delay = typeof closeDelay === "number" ? closeDelay : 200;

    setTimeout(() => {
      setSelectOpen(false);
    }, delay);
  };

  return (
    <div
      className="border border-gray-200 rounded-[5px] relative select-none min-w-[200px] bg-white"
      style={style}
    >
      <button
        type="button"
        onClick={() => setSelectOpen((prev) => !prev)}
        className="flex justify-between flex-row items-center py-[6px] px-[10px] w-full text-left"
      >
        <span>{title}</span>
        <span aria-hidden>▼</span>
      </button>

      {selectOpen && (
        <Selector
          presets={presetLookup}
          onChange={localChange}
          highlightCol={highlightCol}
        />
      )}
    </div>
  );
};

export default MonthPicker;
