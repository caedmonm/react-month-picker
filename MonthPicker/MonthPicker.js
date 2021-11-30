import moment from "moment";
import React, { memo, useState, useEffect } from "react";
import { Selected, SelectedText, TitleWrapper } from "./MonthPicker.styled";
import Selector from "./Selector/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MonthPicker = ({ onChange, value, presets }) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [title, setTitle] = useState(false);
  useEffect(() => {
    updateTitle(value);
  }, []);

  const updateTitle = (v) => {
    if (!v || v.length < 2) {
      return setTitle("No dates selected");
    }
    const presetTitle = presets && presets.length
      ? presets.find(
        (p) =>
          moment(p.start).isSame(moment(v[0]), "month") &&
          moment(p.end).isSame(moment(v[1]), "month")
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
    onChange(v);
    setTimeout(() => {
      setSelectOpen(false);
    }, 200);
  };

  return (
    <Selected>
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

export default memo(MonthPicker);
