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

## Styling with Tailwind CSS

This package includes pre-built Tailwind CSS styles. To use them:

```tsx
// Import the component
import MonthPicker from "simple-react-month-picker";

// Import the Tailwind CSS styles
import "simple-react-month-picker/styles.css";

function App() {
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

## License

MIT
