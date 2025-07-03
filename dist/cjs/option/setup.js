"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.decorator = void 0;
/* src/option/setup.ts */
const utils_1 = require("../deco3/utils");
const slot_1 = require("../slot");
const composable_1 = require("../composable");
function decorator(setupFunction) {
    return (0, utils_1.compatibleMemberDecorator)(function (proto, name) {
        const slot = (0, slot_1.obtainSlot)(proto);
        const map = slot.obtainMap('setup');
        map.set(name, {
            setupFunction
        });
    });
}
exports.decorator = decorator;
const isPromise = (v) => v instanceof Promise;
// function tryInstantiateComposable(value: any, props: any, ctx: any): any {
//   if (typeof value === 'function' && value[ComposableSymbol]) {
//     return instantiateComposable(value, props, ctx)
//   }
//   return value
// }
function build(cons, optionBuilder) {
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    const map = slot.getMap('setup');
    if (!map || map.size === 0) {
        return;
    }
    const setup = function (props, ctx) {
        const setupData = {};
        let promises = null;
        for (const name of map.keys()) {
            let value = map.get(name).setupFunction(props, ctx);
            // 💡 Try to call composables that are accidentally passed as classes
            if ((0, composable_1.isComposable)(value)) {
                value = (0, composable_1.instantiateComposable)(value, props, ctx);
            }
            if (isPromise(value)) {
                promises !== null && promises !== void 0 ? promises : (promises = []);
                promises.push(value.then((v) => {
                    setupData[name] = v;
                }));
            }
            else {
                setupData[name] = value;
            }
        }
        if (promises) {
            return Promise.all(promises).then(() => setupData);
        }
        return setupData;
    };
    optionBuilder.setup = setup;
}
exports.build = build;
//# sourceMappingURL=setup.js.map