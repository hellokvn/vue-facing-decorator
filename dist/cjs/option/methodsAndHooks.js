"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.decorator = exports.HookNames = void 0;
const utils_1 = require("../utils");
const slot_1 = require("../slot");
exports.HookNames = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "activated",
    "deactivated",
    "beforeDestroy",
    "beforeUnmount",
    "destroyed",
    "unmounted",
    "renderTracked",
    "renderTriggered",
    "errorCaptured",
    "serverPrefetch",
    "render"
];
exports.decorator = (0, utils_1.optionNullableMemberDecorator)(function (proto, name) {
    const slot = (0, slot_1.obtainSlot)(proto);
    const map = slot.obtainMap('hooks');
    map.set(name, null);
});
function build(cons, optionBuilder) {
    var _a, _b, _c;
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    const protoArr = (0, utils_1.toComponentReverse)(cons.prototype);
    const map = slot.obtainMap('hooks');
    (_a = optionBuilder.hooks) !== null && _a !== void 0 ? _a : (optionBuilder.hooks = {});
    (_b = optionBuilder.methods) !== null && _b !== void 0 ? _b : (optionBuilder.methods = {});
    const HookFunctions = {};
    const MethodFunctions = {};
    protoArr.forEach(proto => {
        let names = (0, utils_1.getValidOwnPropertyNames)(proto, (des, name) => {
            return typeof des.value === 'function' && name !== 'constructor';
        });
        //include these names:
        //watch, user may call watch method directly
        //hooks, user may call hook method directly
        //emits, user may have a method name which is same as one of event names
        //provide, user may access field directly
        //customDecorator
        names = (0, utils_1.filterNames)(names, slot, ['watch', 'hooks', 'emits', 'provide', 'customDecorator']);
        names.forEach(name => {
            if (exports.HookNames.includes(name) || map.has(name)) {
                HookFunctions[name] = proto[name];
            }
            else {
                MethodFunctions[name] = proto[name];
            }
        });
    });
    Object.assign(optionBuilder.methods, MethodFunctions);
    const beforeCreateCallbacks = [...(_c = optionBuilder.beforeCreateCallbacks) !== null && _c !== void 0 ? _c : []];
    if (beforeCreateCallbacks && beforeCreateCallbacks.length > 0) {
        const oldBeforeCreateCallback = HookFunctions['beforeCreate'];
        HookFunctions['beforeCreate'] = function () {
            beforeCreateCallbacks.forEach(callback => callback.apply(this, arguments));
            if (oldBeforeCreateCallback) {
                oldBeforeCreateCallback.apply(this, arguments);
            }
        };
    }
    Object.assign(optionBuilder.hooks, HookFunctions);
}
exports.build = build;
//# sourceMappingURL=methodsAndHooks.js.map