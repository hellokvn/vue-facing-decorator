"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.decorator = void 0;
const utils_1 = require("../utils");
const slot_1 = require("../slot");
exports.decorator = (0, utils_1.optionNullableMemberDecorator)(function (proto, name, option) {
    const slot = (0, slot_1.obtainSlot)(proto);
    const map = slot.obtainMap('inject');
    const opt = Object.assign({}, option !== null && option !== void 0 ? option : {});
    map.set(name, opt);
});
function build(cons, optionBuilder) {
    var _a;
    (_a = optionBuilder.inject) !== null && _a !== void 0 ? _a : (optionBuilder.inject = {});
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    const names = slot.getMap('inject');
    if (!names || names.size === 0) {
        return;
    }
    names.forEach((value, name) => {
        optionBuilder.inject[name] = value;
    });
}
exports.build = build;
//# sourceMappingURL=inject.js.map