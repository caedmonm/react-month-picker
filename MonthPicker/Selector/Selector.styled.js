import styled from "styled-components";

export const Modal = styled.div`
  background-color: white;
  border: ${({ theme }) => theme.primary.colours.grey_light} 1px solid;
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 99999;
  width: 425px;
  flex-direction: row;
  display: flex;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
`;

export const Presets = styled.div`
  box-sizing: border-box;
  flex: 0.5;
  padding: 20px;
  border-right: ${({ theme }) => theme.primary.colours.grey_light} 1px solid;
`;

export const MonthPicker = styled.div`
  box-sizing: border-box;
  flex: 1;
  padding: 20px;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.primary.colours.grey_medium};
  margin: 0 0 20px 0;
  user-select: none;
`;

export const Preset = styled.div`
  color: ${({ theme }) => theme.primary.colours.blue_grey};
  font-weight: bold;
  cursor: pointer;
`;

export const YearPicker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const YearTitle = styled.div`
  user-select: none;
`;

export const Months = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
  margin-top: 10px;
`;

export const Month = styled.div`
  border: ${({ theme }) => theme.primary.colours.grey_light} 1px solid;
  padding: 5px;
  border-radius: 5px;
  background-color: white;
  text-align: center;
  &:hover {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  }

  &.selected {
    background-color: ${({ theme }) => theme.primary.colours.greenL};
    color: white;
  }

  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
