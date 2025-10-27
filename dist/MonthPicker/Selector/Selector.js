"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var React = __importStar(require("react"));
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var SelectorStyles = require("./Selector.styled");
var createYears = function () {
    var currentYear = Number((0, moment_1.default)().format("YYYY"));
    var years = [];
    for (var year = 2010; year <= currentYear; year += 1) {
        var months = Array.from({ length: 12 }, function (_, index) {
            var monthIndex = index + 1;
            var date = (0, moment_1.default)(year + "-" + monthIndex + "-01 00:00:00").toDate();
            return {
                selected: false,
                date: date,
            };
        });
        years.push({ year: year, months: months });
    }
    return years;
};
var normalizeRange = function (value) {
    var start = value[0], end = value[1];
    return [start !== null && start !== void 0 ? start : null, end !== null && end !== void 0 ? end : null];
};
var Selector = function (_a) {
    var presets = _a.presets, onChange = _a.onChange, highlightCol = _a.highlightCol;
    var _b = React.useState(0), yearIndex = _b[0], setYearIndex = _b[1];
    var _c = React.useState([]), years = _c[0], setYears = _c[1];
    var _d = React.useState([]), selected = _d[0], setSelected = _d[1];
    var presetList = React.useMemo(function () { return (presets !== null && presets !== void 0 ? presets : []); }, [presets]);
    React.useEffect(function () {
        var yearsList = createYears();
        setYears(yearsList);
        setYearIndex(yearsList.length - 1);
    }, []);
    React.useEffect(function () {
        if (selected.length === 2) {
            onChange(normalizeRange(selected));
        }
    }, [selected, onChange]);
    var setSelectedLocal = function (monthIndex, month) {
        setYears(function (currentYears) {
            return currentYears.map(function (definition, index) {
                if (index !== yearIndex) {
                    return definition;
                }
                var months = definition.months.map(function (monthDefinition, idx) {
                    return idx === monthIndex
                        ? Object.assign(Object.assign({}, monthDefinition), { selected: true })
                        : monthDefinition;
                });
                return Object.assign(Object.assign({}, definition), { months: months });
            });
        });
        setSelected(function (currentSelected) {
            if (!currentSelected.length) {
                return [month.date];
            }
            var first = currentSelected[0];
            if (first && (0, moment_1.default)(first).isBefore((0, moment_1.default)(month.date))) {
                return [first, month.date];
            }
            return [month.date, first !== null && first !== void 0 ? first : month.date];
        });
    };
    var pickPreset = function (_a) {
        var start = _a.start, end = _a.end;
        setSelected([start, end]);
    };
    var year = years[yearIndex];
    if (!year) {
        return null;
    }
    return (React.createElement(SelectorStyles.Modal, null,
        presetList.length > 0 && (React.createElement(SelectorStyles.Presets, null,
            React.createElement(SelectorStyles.Title, null, "PRESETS"),
            presetList.map(function (preset, index) { return (React.createElement(SelectorStyles.Preset, { onClick: function () { return pickPreset(preset); }, key: preset.title + "-" + index }, preset.title)); }))),
        React.createElement(SelectorStyles.MonthPicker, null,
            React.createElement(SelectorStyles.Title, null, "SELECT A MONTH RANGE:"),
            React.createElement(SelectorStyles.YearPicker, null,
                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faChevronCircleLeft, style: {
                        width: 20,
                        height: 20,
                        opacity: !yearIndex ? 0.2 : 1,
                        cursor: !yearIndex ? "default" : "pointer",
                    }, onClick: function () { return (yearIndex ? setYearIndex(yearIndex - 1) : null); } }),
                React.createElement(SelectorStyles.YearTitle, null, year.year),
                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faChevronCircleRight, style: {
                        width: 20,
                        height: 20,
                        opacity: yearIndex === years.length - 1 ? 0.2 : 1,
                        cursor: yearIndex === years.length - 1 ? "default" : "pointer",
                    }, onClick: function () { return (yearIndex < years.length - 1 ? setYearIndex(yearIndex + 1) : null); } })),
            React.createElement(SelectorStyles.Months, null, year.months.map(function (definition, index) {
                var isSelected = definition.selected === true || (selected.length === 2 &&
                    (0, moment_1.default)(definition.date).isSameOrAfter((0, moment_1.default)(selected[0]), "month") &&
                    (0, moment_1.default)(definition.date).isSameOrBefore((0, moment_1.default)(selected[1]), "month"));
                var isDisabled = (0, moment_1.default)(definition.date).isAfter((0, moment_1.default)().endOf("month"));
                return (React.createElement(SelectorStyles.Month, { highlightCol: highlightCol, className: isSelected ? "selected" : "", disabled: isDisabled, key: year.year + "-" + index, onClick: function () { return setSelectedLocal(index, definition); } }, (0, moment_1.default)(definition.date).format("MMM")));
            })))));
};
exports.default = React.memo(Selector);
