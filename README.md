# Simple React Month Picker

Simple-React-Month-Picker Component offers a popup month selection panel with the option of presets or custom month ranges.

## Installation

`npm install simple-react-month-picker --save`

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

## Props

| prop           | type     | description                                                                                                                                   |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`     | `func`   | Function invoked when start and end dates have been selected, it will be passed an array with the start and end dates: `[startDate, endDate]` |
| `presets`      | `array`  | Array of objects to use as presets: `[{title: "preset title", start: startDate, end: endDate}]`                                               |
| `closeDelay`   | `int`    | Delay in ms before pop-up window closes                                                                                                       |
| `value`        | `array`  | Starting dates: `[startDate, endDate]`                                                                                                        |
| `highlightCol` | `string` | Colour of selected months                                                                                                                     |

## Usage Example

### Online demo

https://codesandbox.io/s/simple-react-month-picker-p9uhe

### Code sample

```js
import MonthPicker from "simple-react-month-picker";
```

```jsx
import moment from "moment";

function App() {
  return (
    <div>
      <MonthPicker
        style={{ width: 300, margin: "50px auto" }}
        presets={[
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
            title: "Past Year",
            start: moment().subtract(12, "month").startOf("month").toDate(),
            end: moment().endOf("month").toDate(),
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
