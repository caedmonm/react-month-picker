import MonthPicker from "./components/MonthPicker";
import moment from "moment";

function App() {
  const presets = [
    {
      title: "This month",
      start: moment().startOf("month").toDate(),
      end: moment().endOf("month").toDate(),
    },
    {
      title: "Past 3 months",
      start: moment().subtract(2, "month").startOf("month").toDate(),
      end: moment().endOf("month").toDate(),
    },
    {
      title: "Past 6 months",
      start: moment().subtract(5, "month").startOf("month").toDate(),
      end: moment().endOf("month").toDate(),
    },
    {
      title: "This Year",
      start: moment().startOf("year").toDate(),
      end: moment().endOf("year").toDate(),
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
