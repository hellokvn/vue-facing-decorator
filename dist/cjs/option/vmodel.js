"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.decorator = void 0;
const utils_1 = require("../utils");
const props_1 = require("./props");
const slot_1 = require("../slot");
exports.decorator = (0, utils_1.optionNullableMemberDecorator)(function (proto, name, option) {
    var _a;
    option !== null && option !== void 0 ? option : (option = {});
    const slot = (0, slot_1.obtainSlot)(proto);
    let vmodelName = 'modelValue';
    const propsConfig = Object.assign({}, option);
    if (propsConfig) {
        vmodelName = (_a = propsConfig.name) !== null && _a !== void 0 ? _a : vmodelName;
        delete propsConfig.name;
    }
    (0, props_1.decorator)(propsConfig)(proto, vmodelName);
    const map = slot.obtainMap('v-model');
    map.set(name, option);
});
function build(cons, optionBuilder) {
    var _a;
    (_a = optionBuilder.computed) !== null && _a !== void 0 ? _a : (optionBuilder.computed = {});
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    const names = slot.getMap('v-model');
    if (!names || names.size === 0) {
        return;
    }
    const emits = slot.obtainMap('emits');
    names.forEach((value, name) => {
        var _a;
        const vmodelName = (_a = (value && value.name)) !== null && _a !== void 0 ? _a : 'modelValue';
        const eventName = `update:${vmodelName}`;
        optionBuilder.computed[name] = {
            get: function () {
                return this[vmodelName];
            },
            set: function (val) {
                this.$emit(eventName, val);
            }
        };
        emits.set(eventName, true);
    });
}
exports.build = build;
//# sourceMappingURL=vmodel.js.map