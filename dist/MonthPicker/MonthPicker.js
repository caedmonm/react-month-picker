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
var Selector_1 = __importDefault(require("./Selector/Selector"));
var MonthPicker_styled_1 = require("./MonthPicker.styled");
var DEFAULT_TITLE = "No dates selected";
var isMatchingPreset = function (preset, value) {
    var start = value[0], end = value[1];
    if (start === null || end === null) {
        return false;
    }
    var matchesStart = (0, moment_1.default)(preset.start).isSame((0, moment_1.default)(start), "month") || preset.start === start;
    var matchesEnd = (0, moment_1.default)(preset.end).isSame((0, moment_1.default)(end), "month") || preset.end === end;
    return matchesStart && matchesEnd;
};
var formatRangeTitle = function (range) {
    var start = range[0], end = range[1];
    if (!start || !end) {
        return DEFAULT_TITLE;
    }
    return (0, moment_1.default)(start).format("MMM YY") + " - " + (0, moment_1.default)(end).format("MMM YY");
};
var MonthPicker = function (_a) {
    var onChange = _a.onChange, value = _a.value, presets = _a.presets, style = _a.style, closeDelay = _a.closeDelay, highlightCol = _a.highlightCol;
    var _b = React.useState(false), selectOpen = _b[0], setSelectOpen = _b[1];
    var _c = React.useState(DEFAULT_TITLE), title = _c[0], setTitle = _c[1];
    var presetLookup = React.useMemo(function () { return (presets !== null && presets !== void 0 ? presets : []); }, [presets]);
    var updateTitle = function (range) {
        if (!range || range.length < 2) {
            setTitle(DEFAULT_TITLE);
            return;
        }
        var matchingPreset = presetLookup.length > 0
            ? (presetLookup.find(function (preset) { return isMatchingPreset(preset, range); }) || null)
            : null;
        if (matchingPreset) {
            setTitle(matchingPreset.title);
            return;
        }
        setTitle(formatRangeTitle(range));
    };
    React.useEffect(function () {
        updateTitle((value !== null && value !== void 0 ? value : null));
    }, [value, presetLookup]);
    var localChange = function (range) {
        updateTitle(range);
        if (typeof onChange === "function") {
            var start = range[0], end = range[1];
            onChange([
                start === null ? null : (0, moment_1.default)(start).startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
                end === null ? null : (0, moment_1.default)(end).endOf("month").format("YYYY-MM-DDTHH:mm:ss"),
            ]);
        }
        var delay = typeof closeDelay === "number" ? closeDelay : 200;
        setTimeout(function () {
            setSelectOpen(false);
        }, delay);
    };
    return (React.createElement(MonthPicker_styled_1.Selected, { style: style },
        React.createElement(MonthPicker_styled_1.TitleWrapper, { onClick: function () { return setSelectOpen(function (previous) { return !previous; }); } },
            React.createElement(MonthPicker_styled_1.SelectedText, null, title),
            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faChevronDown, style: { width: 14, height: 14 } })),
        selectOpen && (React.createElement(Selector_1.default, { presets: presetLookup, onChange: localChange, highlightCol: highlightCol }))));
};
exports.default = MonthPicker;
