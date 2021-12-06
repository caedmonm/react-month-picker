import MonthPicker from "./components/MonthPicker/MonthPicker";
import moment from "moment";

function App() {
  return (
    <div>
      <MonthPicker
        style={{ width: 300, margin: "50px auto" }}
        presets={[
          {
            title: "This month",
            start: moment.utc().startOf("month").toDate(),
            end: moment.utc().endOf("month").toDate(),
          },
          {
            title: "Past 3 months",
            start: moment.utc().subtract(2, "month").startOf("month").toDate(),
            end: moment.utc().endOf("month").toDate(),
          },
          {
            title: "Past 6 months",
            start: moment.utc().subtract(5, "month").startOf("month").toDate(),
            end: moment.utc().endOf("month").toDate(),
          },
          {
            title: "Past Year",
            start: moment.utc().subtract(12, "month").startOf("month").toDate(),
            end: moment.utc().endOf("month").toDate(),
          },
          {
            title: "All time",
            start: null,
            end: null,
          },
        ]}
        onChange={(range) => console.log(range)}
				closeDelay={500}
      />
    </div>
  );
}

export default App;
