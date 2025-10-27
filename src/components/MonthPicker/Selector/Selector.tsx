import moment, { MomentInput } from "moment";
import React, { memo, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  Modal,
  Presets,
  MonthPicker as MonthPickerContainer,
  Title,
  Preset,
  YearPicker,
  YearTitle,
  Months,
  Month,
} from "./Selector.styled";
import type { MonthPreset, MonthRangeValue } from "../MonthPicker.types";

type SelectorProps = {
  presets?: MonthPreset[];
  onChange: (value: MonthRangeValue) => void;
  highlightCol?: string;
};

type MonthDefinition = {
  selected: boolean;
  date: Date;
};

type YearDefinition = {
  year: number;
  months: MonthDefinition[];
};

const createYears = (): YearDefinition[] => {
  const currentYear = Number(moment().format("YYYY"));
  const years: YearDefinition[] = [];

  for (let year = 2010; year <= currentYear; year += 1) {
    const months: MonthDefinition[] = Array.from({ length: 12 }, (_, index) => {
      const monthIndex = index + 1;
      const date = moment(`${year}-${monthIndex}-01 00:00:00`).toDate();

      return {
        selected: false,
        date,
      };
    });

    years.push({ year, months });
  }

  return years;
};

const normalizeRange = (value: MomentInput[]): MonthRangeValue => {
  const [start, end] = value;

  return [start ?? null, end ?? null];
};

const Selector: React.FC<SelectorProps> = ({ presets, onChange, highlightCol }) => {
  const [yearIndex, setYearIndex] = useState(0);
  const [years, setYears] = useState<YearDefinition[]>([]);
  const [selected, setSelected] = useState<MomentInput[]>([]);

  const presetList = useMemo(() => presets ?? [], [presets]);

  useEffect(() => {
    const yearsList = createYears();
    setYears(yearsList);
    setYearIndex(yearsList.length - 1);
  }, []);

  useEffect(() => {
    if (selected.length === 2) {
      onChange(normalizeRange(selected));
    }
  }, [selected, onChange]);

  const setSelectedLocal = (monthIndex: number, month: MonthDefinition) => {
    setYears((currentYears) =>
      currentYears.map((definition, index) => {
        if (index !== yearIndex) {
          return definition;
        }

        const months = definition.months.map((monthDefinition, idx) =>
          idx === monthIndex
            ? {
                ...monthDefinition,
                selected: true,
              }
            : monthDefinition
        );

        return {
          ...definition,
          months,
        };
      })
    );

    setSelected((currentSelected) => {
      if (!currentSelected.length) {
        return [month.date];
      }

      const [first] = currentSelected;

      if (first && moment(first).isBefore(moment(month.date))) {
        return [first, month.date];
      }

      return [month.date, first ?? month.date];
    });
  };

  const pickPreset = ({ start, end }: MonthPreset) => {
    setSelected([start, end]);
  };

  const year = years[yearIndex];

  if (!year) {
    return null;
  }

  return (
    <Modal>
      {presetList.length > 0 && (
        <Presets>
          <Title>PRESETS</Title>
          {presetList.map((preset, index) => (
            <Preset onClick={() => pickPreset(preset)} key={`${preset.title}-${index}`}>
              {preset.title}
            </Preset>
          ))}
        </Presets>
      )}
      <MonthPickerContainer>
        <Title>SELECT A MONTH RANGE:</Title>
        <YearPicker>
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            style={{
              width: 20,
              height: 20,
              opacity: !yearIndex ? 0.2 : 1,
              cursor: !yearIndex ? "default" : "pointer",
            }}
            onClick={() => (yearIndex ? setYearIndex(yearIndex - 1) : null)}
          />
          <YearTitle>{year.year}</YearTitle>
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            style={{
              width: 20,
              height: 20,
              opacity: yearIndex === years.length - 1 ? 0.2 : 1,
              cursor: yearIndex === years.length - 1 ? "default" : "pointer",
            }}
            onClick={() =>
              yearIndex < years.length - 1 ? setYearIndex(yearIndex + 1) : null
            }
          />
        </YearPicker>
        <Months>
          {year.months.map((definition, index) => {
            const isSelected =
              definition.selected === true ||
              (selected.length === 2 &&
                moment(definition.date).isSameOrAfter(moment(selected[0]), "month") &&
                moment(definition.date).isSameOrBefore(moment(selected[1]), "month"));

            const isDisabled = moment(definition.date).isAfter(moment().endOf("month"));

            return (
              <Month
                highlightCol={highlightCol}
                className={isSelected ? "selected" : ""}
                disabled={isDisabled}
                key={`${year.year}-${index}`}
                onClick={() => setSelectedLocal(index, definition)}
              >
                {moment(definition.date).format("MMM")}
              </Month>
            );
          })}
        </Months>
      </MonthPickerContainer>
    </Modal>
  );
};

export default memo(Selector);
