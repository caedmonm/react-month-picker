import moment from "moment";
import React, { useState, useEffect } from "react";
import { Selected, SelectedText, TitleWrapper } from "./MonthPicker.styled";
import Selector from "./Selector/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MonthPicker = ({
  onChange,
  value,
  presets,
  style,
  closeDelay,
  highlightCol,
}) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [title, setTitle] = useState(false);

  useEffect(() => {
    updateTitle(value);
  }, []);

  const updateTitle = (v) => {
    if (!v || v.length < 2) {
      return setTitle("No dates selected");
    }
		
    const presetTitle =
      presets && presets.length
        ? presets.find(
            (p) =>
              (moment(p.start).isSame(moment(v[0]), "month") ||
                p.start === v[0]) &&
              (moment(p.end).isSame(moment(v[1]), "month") || p.end === v[1])
          )
        : null;

    return setTitle(
      presetTitle
        ? presetTitle.title
        : moment(v[0]).format("MMM YY") + " - " + moment(v[1]).format("MMM YY")
    );
  };

  const localChange = (v) => {
    updateTitle(v);

    if (typeof onChange === "function") {
      onChange([
        v[0] === null
          ? null
          : moment(v[0]).startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
        v[1] === null
          ? null
          : moment(v[1]).endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
      ]);
    }

    setTimeout(
      () => {
        setSelectOpen(false);
      },
      closeDelay ? closeDelay : 200
    );
  };

  return (
    <Selected style={style}>
      <TitleWrapper onClick={(e) => setSelectOpen(!selectOpen)}>
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
          presets={presets}
          onChange={localChange}
          highlightCol={highlightCol}
        />
      )}
    </Selected>
  );
};

export default MonthPicker;
