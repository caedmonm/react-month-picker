import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Selector from "./Selector/Selector";
import { Selected, SelectedText, TitleWrapper } from "./MonthPicker.styled";
import type { MonthPickerProps, MonthRangeValue, MonthPreset } from "./MonthPicker.types";

const DEFAULT_TITLE = "No dates selected";

const isMatchingPreset = (preset: MonthPreset, value: MonthRangeValue): boolean => {
  const [start, end] = value;

  if (start === null || end === null) {
    return false;
  }

  const matchesStart = moment(preset.start).isSame(moment(start), "month") || preset.start === start;
  const matchesEnd = moment(preset.end).isSame(moment(end), "month") || preset.end === end;

  return matchesStart && matchesEnd;
};

const formatRangeTitle = (range: MonthRangeValue): string => {
  const [start, end] = range;

  if (!start || !end) {
    return DEFAULT_TITLE;
  }

  return `${moment(start).format("MMM YY")} - ${moment(end).format("MMM YY")}`;
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
        start === null ? null : moment(start).startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
        end === null ? null : moment(end).endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
      ]);
    }

    const delay = typeof closeDelay === "number" ? closeDelay : 200;

    setTimeout(() => {
      setSelectOpen(false);
    }, delay);
  };

  return (
    <Selected style={style}>
      <TitleWrapper onClick={() => setSelectOpen((previous) => !previous)}>
        <SelectedText>{title}</SelectedText>
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            width: 14,
            height: 14,
          }}
        />
      </TitleWrapper>
      {selectOpen && (
        <Selector
          presets={presetLookup}
          onChange={localChange}
          highlightCol={highlightCol}
        />
      )}
    </Selected>
  );
};

export default MonthPicker;
