"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDecorator = void 0;
const slot_1 = require("../slot");
const utils_1 = require("../deco3/utils");
function createDecorator(creator, opt) {
    return (0, utils_1.compatibleMemberDecorator)(function (proto, key) {
        const slot = (0, slot_1.obtainSlot)(proto);
        const map = slot.obtainMap('customDecorator');
        if (!map.has(key)) {
            map.set(key, []);
        }
        const arr = map.get(key);
        arr.push({
            key,
            creator,
            preserve: !!(opt === null || opt === void 0 ? void 0 : opt.preserve)
        });
    });
}
exports.createDecorator = createDecorator;
//# sourceMappingURL=custom.js.map