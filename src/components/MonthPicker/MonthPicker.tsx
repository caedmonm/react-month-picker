import React, { useEffect, useMemo, useState } from "react";

import Selector from "./Selector/Selector";
import type {
  MonthPickerProps,
  MonthRangeValue,
  MonthPreset,
} from "./MonthPicker.types";
import dayjs from "dayjs";

const DEFAULT_TITLE = "No dates selected";

const isMatchingPreset = (
  preset: MonthPreset,
  value: MonthRangeValue
): boolean => {
  const [start, end] = value;

  if (start === null || end === null) {
    return false;
  }

  const matchesStart =
    dayjs(preset.start).isSame(dayjs(start), "month") || preset.start === start;
  const matchesEnd =
    dayjs(preset.end).isSame(dayjs(end), "month") || preset.end === end;

  return matchesStart && matchesEnd;
};

const formatRangeTitle = (range: MonthRangeValue): string => {
  const [start, end] = range;

  if (!start || !end) {
    return DEFAULT_TITLE;
  }

  return `${dayjs(start).format("MMM YY")} - ${dayjs(end).format("MMM YY")}`;
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
        start === null
          ? null
          : dayjs(start).startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
        end === null
          ? null
          : dayjs(end).endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
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
