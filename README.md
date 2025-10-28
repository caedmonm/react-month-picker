# simple-react-month-picker

A simple and lightweight React month picker component built with TypeScript.

## Installation

```bash
npm install simple-react-month-picker
```

## Usage

### Option 1: Default Import (Recommended)

```tsx
import React, { useState } from "react";
import MonthPicker from "simple-react-month-picker";

function App() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const handleChange = (dateRange: {
    start: Date | null;
    end: Date | null;
  }) => {
    setValue([dateRange.start, dateRange.end]);
  };

  return <MonthPicker value={value} onChange={handleChange} />;
}
```

### Option 2: Named Import

```tsx
import React, { useState } from "react";
import { MonthPicker } from "simple-react-month-picker";

function App() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const handleChange = (dateRange: {
    start: Date | null;
    end: Date | null;
  }) => {
    setValue([dateRange.start, dateRange.end]);
  };

  return <MonthPicker value={value} onChange={handleChange} />;
}
```

### Using Custom Styles

You can override the default styles by providing your own CSS or by using Tailwind utility classes:

```tsx
<MonthPicker
  value={value}
  onChange={handleChange}
  style={{ fontFamily: "Arial, sans-serif" }}
/>
```

## Props

| Prop           | Type                                                              | Default | Description                           |
| -------------- | ----------------------------------------------------------------- | ------- | ------------------------------------- |
| `value`        | `[Date \| null, Date \| null]`                                    | -       | Selected date range [start, end]      |
| `onChange`     | `(dateRange: { start: Date \| null; end: Date \| null }) => void` | -       | Callback when selection changes       |
| `presets`      | `MonthPreset[]`                                                   | -       | Predefined date range options         |
| `style`        | `CSSProperties`                                                   | -       | Additional CSS styles                 |
| `closeDelay`   | `number`                                                          | `200`   | Delay before closing selector (ms)    |
| `highlightCol` | `string`                                                          | -       | Color for highlighting selected range |

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Build in watch mode
npm run build:watch
```

### Local test application

A Vite-powered playground lives in `test-app/` to make it easier to iterate on the
month picker while developing.

```bash
# Terminal 1: keep the library build up to date
npm run build:watch

# Terminal 2: run the playground
cd test-app
npm install
npm run dev
```

The playground depends on the local package via `file:..`, so keeping the watch
build running ensures any source changes are immediately available in the test
app.


... you might need to `yarn remove simple-react-month-picker` then `yarn add file:..`

## License

MIT
