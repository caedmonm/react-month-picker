import { useCallback, useMemo, useState } from 'react';
import MonthPicker, {
  type MonthPreset,
  type MonthRangeValue
} from 'simple-react-month-picker';
import 'simple-react-month-picker/styles.css';
import './App.css';

const formatRangeDate = (date: Date | null) =>
  date
    ? new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    : '—';

const createPreset = (title: string, start: Date, end: Date): MonthPreset => ({
  title,
  start,
  end
});

const App = () => {
  const [value, setValue] = useState<MonthRangeValue>([null, null]);

  const presets = useMemo<MonthPreset[]>(() => {
    const now = new Date();
    const currentYearStart = new Date(now.getFullYear(), 0, 1);
    const currentYearEnd = new Date(now.getFullYear(), 11, 1);
    const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
    const lastYearEnd = new Date(now.getFullYear() - 1, 11, 1);

    return [
      createPreset('This Year', currentYearStart, currentYearEnd),
      createPreset('Last Year', lastYearStart, lastYearEnd)
    ];
  }, []);

  const handleChange = useCallback((range: [Date, Date]) => {
    setValue(range);
  }, []);

  const clearSelection = useCallback(() => {
    setValue([null, null]);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Simple React Month Picker Test App</h1>
        <p>
          Use this sandbox to develop and verify changes to the
          <code> simple-react-month-picker </code>
          module locally. Run the library build in watch mode alongside this app
          for the best experience.
        </p>
      </header>

      <section className="app__controls">
        <MonthPicker
          value={value}
          onChange={handleChange}
          presets={presets}
          highlightCol="#4f46e5"
        />
        <button type="button" className="app__button" onClick={clearSelection}>
          Clear selection
        </button>
      </section>

      <section className="app__summary">
        <h2>Selected range</h2>
        <div className="app__summary-grid">
          <div>
            <span className="app__summary-label">Start:</span>
            <span>{formatRangeDate(value[0])}</span>
          </div>
          <div>
            <span className="app__summary-label">End:</span>
            <span>{formatRangeDate(value[1])}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
