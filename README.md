# Simple React Month Picker

Simple-React-Month-Picker Component offers a popup month selection panel with the option of presets or custom month ranges.

## Installation
```npm install simple-react-month-picker --save```

## Snapshots

Customisable preset options list:
![Preset options](https://user-images.githubusercontent.com/795134/144825642-036e6348-cab4-447d-a7d0-7b18f6ca2350.png)

Custom range selection:
![Custom months](https://user-images.githubusercontent.com/795134/144825638-073bb937-2325-4a7f-884d-d658658a81fd.png)

## Configuration

The most basic use: 
```
<MonthPicker onChange={handleChange} />
```

### Props

*onChange* returns an array `[startDate, endDate]`
*presets* should be an array of objects: `[{title: "preset title", start: startDate, end: endDate}]`
*closeDelay* delay in ms before pop-up window closes

## Example

```
import MonthPicker from "./components/MonthPicker/MonthPicker";
```
```
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
```

