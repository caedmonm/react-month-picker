"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedText = exports.TitleWrapper = exports.Selected = void 0;
var styled_components_1 = require("styled-components");
exports.Selected = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: #eee 1px solid;\n  border-radius: 5px;\n  position: relative;\n  user-select: none;\n  min-width: 200px;\n  background-color: white;\n"], ["\n  border: #eee 1px solid;\n  border-radius: 5px;\n  position: relative;\n  user-select: none;\n  min-width: 200px;\n  background-color: white;\n"])));
exports.TitleWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n  align-items: center;\n  padding: 6px 10px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n  align-items: center;\n  padding: 6px 10px;\n"])));
exports.SelectedText = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3;
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
}
