import dayjs from "dayjs";
import { MonthPicker, type MonthPreset } from "./components";
import "./App.css";

function App() {
  const presets: MonthPreset[] = [
    {
      title: "This month",
      start: dayjs().startOf("month").toDate(),
      end: dayjs().endOf("month").toDate(),
    },
    {
      title: "Past 3 months",
      start: dayjs().subtract(2, "month").startOf("month").toDate(),
      end: dayjs().endOf("month").toDate(),
    },
    {
      title: "Past 6 months",
      start: dayjs().subtract(5, "month").startOf("month").toDate(),
      end: dayjs().endOf("month").toDate(),
    },
    {
      title: "This Year",
      start: dayjs().startOf("year").toDate(),
      end: dayjs().endOf("year").toDate(),
    },
  ];

  return (
    <div style={{ width: 300, margin: "50px auto" }}>
      <MonthPicker
        highlightCol="#f60"
        presets={presets}
        onChange={(range) => console.log(range)}
        closeDelay={500}
      />
    </div>
  );
}

export default App;
