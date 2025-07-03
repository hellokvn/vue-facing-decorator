"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantiateComposable = exports.isComposable = exports.Composable = exports.ComposableSymbol = void 0;
const slot_1 = require("./slot");
const utils_1 = require("./utils");
exports.ComposableSymbol = Symbol('vue-facing-decorator-composable');
exports.Composable = (0, utils_1.optionNullableClassDecorator)((cons) => {
    cons[exports.ComposableSymbol] = true;
});
function isComposable(value) {
    return typeof value === 'function' && value[exports.ComposableSymbol] === true;
}
exports.isComposable = isComposable;
function instantiateComposable(Cls, props, ctx) {
    const inst = new Cls();
    const slot = (0, slot_1.obtainSlot)(Cls.prototype);
    const map = slot.getMap('setup');
    let promises = null;
    if (map && map.size > 0) {
        for (const name of map.keys()) {
            const setupState = map.get(name).setupFunction(props, ctx);
            if (setupState instanceof Promise) {
                promises !== null && promises !== void 0 ? promises : (promises = []);
                promises.push(setupState.then(result => { inst[name] = result; }));
            }
            else {
                inst[name] = setupState;
            }
        }
    }
    if (promises) {
        return Promise.all(promises).then(() => inst);
    }
    return inst;
}
exports.instantiateComposable = instantiateComposable;
//# sourceMappingURL=composable.js.map