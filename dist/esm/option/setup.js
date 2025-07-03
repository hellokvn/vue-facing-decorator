/* src/option/setup.ts */
import { compatibleMemberDecorator } from '../deco3/utils';
import { obtainSlot } from '../slot';
import { instantiateComposable, isComposable } from '../composable';
export function decorator(setupFunction) {
    return compatibleMemberDecorator(function (proto, name) {
        const slot = obtainSlot(proto);
        const map = slot.obtainMap('setup');
        map.set(name, {
            setupFunction
        });
    });
}
const isPromise = (v) => v instanceof Promise;
// function tryInstantiateComposable(value: any, props: any, ctx: any): any {
//   if (typeof value === 'function' && value[ComposableSymbol]) {
//     return instantiateComposable(value, props, ctx)
//   }
//   return value
// }
export function build(cons, optionBuilder) {
    const slot = obtainSlot(cons.prototype);
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
            if (isComposable(value)) {
                value = instantiateComposable(value, props, ctx);
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
//# sourceMappingURL=setup.js.map