"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.decorator = void 0;
const vue_1 = require("vue");
const utils_1 = require("../utils");
const slot_1 = require("../slot");
exports.decorator = (0, utils_1.optionNullableMemberDecorator)(function (proto, name, key) {
    const slot = (0, slot_1.obtainSlot)(proto);
    const map = slot.obtainMap('provide');
    map.set(name, typeof key === 'undefined' ? null : key);
});
function build(cons, optionBuilder, vueInstance) {
    var _a;
    (_a = optionBuilder.provide) !== null && _a !== void 0 ? _a : (optionBuilder.provide = {});
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    const names = slot.obtainMap('provide');
    if (!names)
        return null;
    names.forEach((value, name) => {
        const key = value === null ? name : value;
        optionBuilder.provide[key] = (0, vue_1.computed)(() => vueInstance[name]);
    });
}
exports.build = build;
//# sourceMappingURL=provide.js.map