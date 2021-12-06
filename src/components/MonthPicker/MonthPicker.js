import moment from "moment";
import React, { useState, useEffect } from "react";
import { Selected, SelectedText, TitleWrapper } from "./MonthPicker.styled";
import Selector from "./Selector/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MonthPicker = ({ onChange, value, presets, style }) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [title, setTitle] = useState(false);
  const [currentVal, setCurrentVal] = useState(value);

  useEffect(() => {
    if (!currentVal || currentVal.length < 2) {
      return setTitle("No dates selected");
    }
    const presetTitle = presets && presets.length
      ? presets.find(
        (p) =>
          (moment(p.start).isSame(moment(currentVal[0]), "month") || p.start) === currentVal[0] &&
          (moment(p.end).isSame(moment(currentVal[1]), "month") || p.end) === currentVal[1]
      )
      : null;
    return setTitle(
      presetTitle
        ? presetTitle.title
        : moment(currentVal[0]).format("MMM YY") + " - " + moment(currentVal[1]).format("MMM YY")
    );
  }, [currentVal, presets]);

  const localChange = (v) => {
    setCurrentVal(v);
    if (typeof onChange === "function") {
      onChange(v);
    }

    setTimeout(() => {
      setSelectOpen(false);
    }, 200);
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
      {selectOpen && <Selector presets={presets} onChange={localChange} />}
    </Selected>
  );
};

export default MonthPicker;