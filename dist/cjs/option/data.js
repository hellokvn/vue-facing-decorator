"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const utils_1 = require("../utils");
const slot_1 = require("../slot");
function build(cons, optionBuilder) {
    var _a;
    (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : (optionBuilder.data = {});
    const sample = new cons();
    let names = (0, utils_1.getValidOwnPropertyNames)(sample, (des, name) => {
        var _a, _b;
        return !!des.enumerable
            && !((_a = optionBuilder.methods) === null || _a === void 0 ? void 0 : _a[name])
            && !((_b = optionBuilder.props) === null || _b === void 0 ? void 0 : _b[name]);
    });
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    //include these names:
    //provide, user may access field directly
    //customDecorator
    names = (0, utils_1.filterNames)(names, slot, ['provide', 'customDecorator']);
    Object.assign(optionBuilder.data, names.reduce((pv, cv) => {
        pv[cv] = sample[cv];
        return pv;
    }, {}));
}
exports.build = build;
//# sourceMappingURL=data.js.map