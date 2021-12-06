import './App.css';
import MonthPicker from './components/MonthPicker/MonthPicker';
import moment from 'moment';

function App() {
  return (
    <div className="App">
      <MonthPicker
        style={{ width: 300, margin: "50px auto" }}
        presets={[
          {
            title: "This month",
            start: moment.utc().startOf("month"),
            end: moment.utc().endOf("month"),
          },
          {
            title: "Past 3 months",
            start: moment.utc().subtract(2, "month").startOf("month"),
            end: moment.utc().endOf("month"),
          },
          {
            title: "Past 6 months",
            start: moment.utc().subtract(5, "month").startOf("month"),
            end: moment.utc().endOf("month"),
          },
          {
            title: "Past Year",
            start: moment.utc().subtract(12, "month").startOf("month"),
            end: moment.utc().endOf("month"),
          },
          {
            title: "All time",
            start: null,
            end: null,
          },
        ]} />
    </div>
  );
}

export default App;
