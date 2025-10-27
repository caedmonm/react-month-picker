import React, { useEffect, useMemo, useState } from "react";
import Selector from "./Selector/Selector";
import type { MonthPickerProps, MonthRangeValue, MonthPreset } from "./types";

const DEFAULT_TITLE = "No dates selected";

/* ---------- Date helpers ---------- */

const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const getStartOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const getEndOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

const formatMonthYear = (date: Date): string =>
  new Intl.DateTimeFormat("en", { month: "short", year: "2-digit" }).format(
    date
  );

/* ---------- Core logic ---------- */

const isMatchingPreset = (
  preset: MonthPreset,
  value: MonthRangeValue
): boolean => {
  const [start, end] = value;
  if (start === null || end === null) return false;
  return isSameMonth(preset.start, start) && isSameMonth(preset.end, end);
};

const formatRangeTitle = (range: MonthRangeValue): string => {
  const [start, end] = range;
  if (!start || !end) return DEFAULT_TITLE;
  return `${formatMonthYear(start)} - ${formatMonthYear(end)}`;
};

const MonthPicker = React.forwardRef<HTMLDivElement, MonthPickerProps>(
  ({ onChange, value, presets, style, closeDelay, highlightCol }, ref) => {
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
          ? presetLookup.find((preset) => isMatchingPreset(preset, range)) ??
            null
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

        const startBound = start ? getStartOfMonth(start) : null;
        const endBound = end ? getEndOfMonth(end) : null;

        if (startBound && endBound) {
          onChange([startBound, endBound]);
        }
      }

      const delay = typeof closeDelay === "number" ? closeDelay : 200;
      setTimeout(() => setSelectOpen(false), delay);
    };

    return (
      <div
        ref={ref}
        className="border border-gray-200 rounded-[5px] relative select-none min-w-[200px] bg-white"
        style={style}
      >
        <button
          type="button"
          onClick={() => setSelectOpen((prev) => !prev)}
          aria-haspopup="dialog"
          aria-expanded={selectOpen}
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
  }
);

MonthPicker.displayName = "MonthPicker";

export default MonthPicker;
