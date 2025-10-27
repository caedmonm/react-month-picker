import { MonthPicker, type MonthPreset } from "./components";
import "./App.css";

function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + months);
  return newDate;
}

function App() {
  const now = new Date();
  const presets: MonthPreset[] = [
    {
      title: "This month",
      start: getStartOfMonth(now),
      end: getEndOfMonth(now),
    },
    {
      title: "Past 3 months",
      start: getStartOfMonth(addMonths(now, -2)),
      end: getEndOfMonth(now),
    },
    {
      title: "Past 6 months",
      start: getStartOfMonth(addMonths(now, -5)),
      end: getEndOfMonth(now),
    },
    {
      title: "This Year",
      start: new Date(now.getFullYear(), 0, 1),
      end: new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999),
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
