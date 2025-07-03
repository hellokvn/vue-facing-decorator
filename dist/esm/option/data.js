import { filterNames, getValidOwnPropertyNames } from '../utils';
import { obtainSlot } from '../slot';
export function build(cons, optionBuilder) {
    var _a;
    (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : (optionBuilder.data = {});
    const sample = new cons();
    let names = getValidOwnPropertyNames(sample, (des, name) => {
        var _a, _b;
        return !!des.enumerable
            && !((_a = optionBuilder.methods) === null || _a === void 0 ? void 0 : _a[name])
            && !((_b = optionBuilder.props) === null || _b === void 0 ? void 0 : _b[name]);
    });
    const slot = obtainSlot(cons.prototype);
    //include these names:
    //provide, user may access field directly
    //customDecorator
    names = filterNames(names, slot, ['provide', 'customDecorator']);
    Object.assign(optionBuilder.data, names.reduce((pv, cv) => {
        pv[cv] = sample[cv];
        return pv;
    }, {}));
}
//# sourceMappingURL=data.js.map