import moment from "moment";
import React, { memo, useState, useEffect } from "react";
import {
  Modal,
  Presets,
  MonthPicker,
  Title,
  Preset,
  YearPicker,
  YearTitle,
  Months,
  Month,
} from "./Selector.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const Selector = ({ presets, onChange }) => {
  const [yearIndex, setYearIndex] = useState(0);
  const [years, setYears] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let ys = [];
    for (let year = 2010; year <= Number(moment().format("YYYY")); year++) {
      const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
        let date = moment(year + "-" + month + "-01 00:00:00").toDate();
        return {
          selected: false,
          date,
        };
      });
      ys.push({ year, months });
    }
    setYears(ys);
    setYearIndex(ys.length - 1);
  }, []);

  useEffect(() => {
    if (selected.length === 2) {
      onChange(selected);
    }
  }, [selected]);

  const setSelectedLocal = (monthIndex, month) => {
    let ys = [...years];
    ys[yearIndex].months[monthIndex].selected = true;
    setYears(ys);
    if (!selected.length) {
      setSelected([month.date]);
    } else {
      if (moment(selected[0]).isBefore(moment(month.date))) {
        setSelected([selected[0], month.date]);
      } else {
        setSelected([month.date, selected[0]]);
      }
    }
  };

  const pickPreset = ({ start, end }) => {
    setSelected([start, end]);
  };

  const year = years[yearIndex];

  if (!year) {
    return null;
  }

  return (
    <Modal>
      {presets && presets.length && (
        <Presets>
          <Title>PRESETS</Title>
          {presets.map((p, i) => (
            <Preset onClick={(e) => pickPreset(p)} key={i}>
              {p.title}
            </Preset>
          ))}
        </Presets>
      )}
      <MonthPicker>
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
            onClick={(e) => (yearIndex ? setYearIndex(yearIndex - 1) : null)}
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
            onClick={(e) =>
              yearIndex < years.length - 1 ? setYearIndex(yearIndex + 1) : null
            }
          />
        </YearPicker>
        <Months>
          {year.months.map((m, i) => {
            return (
              <Month
                className={
                  m.selected === true ||
                  (selected.length === 2 &&
                    moment(m.date).isSameOrAfter(
                      moment(selected[0]),
                      "month"
                    ) &&
                    moment(m.date).isSameOrBefore(moment(selected[1]), "month"))
                    ? "selected"
                    : ""
                }
                disabled={moment(m.date).isAfter(moment().endOf("month"))}
                key={i}
                onClick={(e) => setSelectedLocal(i, m)}
              >
                {m.selected} {moment(m.date).format("MMM")}
              </Month>
            );
          })}
        </Months>
      </MonthPicker>
    </Modal>
  );
};

export default memo(Selector);
