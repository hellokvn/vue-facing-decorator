import { obtainSlot } from './slot';
import { optionNullableClassDecorator } from './utils';
export const ComposableSymbol = Symbol('vue-facing-decorator-composable');
export const Composable = optionNullableClassDecorator((cons) => {
    cons[ComposableSymbol] = true;
});
export function isComposable(value) {
    return typeof value === 'function' && value[ComposableSymbol] === true;
}
export function instantiateComposable(Cls, props, ctx) {
    const inst = new Cls();
    const slot = obtainSlot(Cls.prototype);
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
//# sourceMappingURL=composable.js.map