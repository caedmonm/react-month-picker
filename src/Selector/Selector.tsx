import React, { memo, useEffect, useMemo, useState } from "react";
import type { MonthPreset, MonthRangeValue } from "../types";

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

// ---- Date helpers (month-level comparisons) ----
const endOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

const cmpMonth = (a: Date, b: Date) => {
  const ay = a.getFullYear(),
    by = b.getFullYear();
  if (ay !== by) return ay - by;
  return a.getMonth() - b.getMonth();
};
const isBeforeMonth = (a: Date, b: Date) => cmpMonth(a, b) < 0;
const isSameOrAfterMonth = (a: Date, b: Date) => cmpMonth(a, b) >= 0;
const isSameOrBeforeMonth = (a: Date, b: Date) => cmpMonth(a, b) <= 0;

const formatMonthShort = (d: Date) =>
  new Intl.DateTimeFormat("en", { month: "short" }).format(d);

// ---- Component utils ----
const createYears = (): YearDefinition[] => {
  const currentYear = new Date().getFullYear();
  const years: YearDefinition[] = [];

  for (let year = 2010; year <= currentYear; year += 1) {
    const months: MonthDefinition[] = Array.from({ length: 12 }, (_, idx) => {
      const date = new Date(year, idx, 1);
      return { selected: false, date };
    });
    years.push({ year, months });
  }
  return years;
};

const normalizeRange = (value: (Date | null)[]): MonthRangeValue => {
  const [start, end] = value;
  return [start ?? null, end ?? null];
};

const Selector: React.FC<SelectorProps> = ({
  presets,
  onChange,
  highlightCol,
}) => {
  const [yearIndex, setYearIndex] = useState(0);
  const [years, setYears] = useState<YearDefinition[]>([]);
  const [selected, setSelected] = useState<(Date | null)[]>([]);

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
        if (index !== yearIndex) return definition;

        const months = definition.months.map((m, idx) =>
          idx === monthIndex ? { ...m, selected: true } : m
        );
        return { ...definition, months };
      })
    );

    setSelected((currentSelected) => {
      if (!currentSelected.length) return [month.date];

      const [first] = currentSelected;
      if (first && isBeforeMonth(first, month.date)) {
        return [first, month.date];
      }
      return [month.date, first ?? month.date];
    });
  };

  const pickPreset = ({ start, end }: MonthPreset) => {
    setSelected([start, end]);
  };

  const year = years[yearIndex];
  if (!year) return null;

  const endOfThisMonth = endOfMonth(new Date());

  return (
    <div className="simple-date-picker-popup absolute top-[35px] right-0 z-[99999] w-[460px] flex flex-row rounded-[5px] border border-[#eee] bg-white shadow-[0_0_10px_0_rgb(0_0_0_/_20%)] max-[425px]:w-full max-[425px]:flex-col">
      {presetList.length > 0 && (
        <div className="box-border basis-1/2 grow-0 p-5 border-r border-[#eee]">
          <div className="text-[#575757] mb-5 select-none">PRESETS</div>
          {presetList.map((preset, index) => (
            <button
              key={`${preset.title}-${index}`}
              type="button"
              onClick={() => pickPreset(preset)}
              className="font-bold cursor-pointer block"
            >
              {preset.title}
            </button>
          ))}
        </div>
      )}

      <div className="box-border flex-1 p-5">
        <div className="text-[#575757] mb-5 select-none">
          SELECT A MONTH RANGE:
        </div>

        <div className="flex flex-row justify-between items-center">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => (yearIndex ? setYearIndex(yearIndex - 1) : null)}
            disabled={!yearIndex}
            className={`
              w-5 h-5
              ${
                !yearIndex
                  ? "opacity-20 cursor-default"
                  : "cursor-pointer hover:opacity-70"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path
                fillRule="evenodd"
                d="M15.78 4.22a.75.75 0 010 1.06L9.06 12l6.72 6.72a.75.75 0 11-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Year */}
          <div className="select-none">{year.year}</div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() =>
              yearIndex < years.length - 1 ? setYearIndex(yearIndex + 1) : null
            }
            disabled={yearIndex === years.length - 1}
            className={`
              w-5 h-5
              ${
                yearIndex === years.length - 1
                  ? "opacity-20 cursor-default"
                  : "cursor-pointer hover:opacity-70"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path
                fillRule="evenodd"
                d="M8.22 19.78a.75.75 0 010-1.06L14.94 12 8.22 5.28a.75.75 0 011.06-1.06l7.25 7.25a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-[5px] mt-[10px]">
          {year.months.map((definition, index) => {
            const [selStart, selEnd] = selected as [Date | null, Date | null];

            const inRange =
              selStart &&
              selEnd &&
              isSameOrAfterMonth(definition.date, selStart) &&
              isSameOrBeforeMonth(definition.date, selEnd);

            const isSelected = definition.selected === true || !!inRange;

            const isDisabled =
              endOfMonth(definition.date).getTime() > endOfThisMonth.getTime();

            // Provide a fallback highlight colour via CSS var for Tailwind arbitrary value
            const highlight = highlightCol ?? "#1d7f7a";

            return (
              <button
                key={`${year.year}-${index}`}
                type="button"
                onClick={() => setSelectedLocal(index, definition)}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                style={
                  isSelected
                    ? ({ ["--hc"]: highlight } as React.CSSProperties)
                    : undefined
                }
                className={[
                  "border border-[#eee] p-[5px] rounded-[5px] text-center",
                  "hover:shadow-[0_0_5px_0_rgba(0,0,0,0.2)] transition duration-200",
                  isSelected ? "text-white bg-[var(--hc)]" : "bg-white",
                  isDisabled
                    ? "pointer-events-none opacity-50 cursor-default"
                    : "cursor-pointer",
                ].join(" ")}
              >
                {formatMonthShort(definition.date)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Selector);
