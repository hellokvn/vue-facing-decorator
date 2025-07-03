import { obtainSlot } from '../slot';
import { compatibleMemberDecorator } from '../deco3/utils';
export function createDecorator(creator, opt) {
    return compatibleMemberDecorator(function (proto, key) {
        const slot = obtainSlot(proto);
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
//# sourceMappingURL=custom.js.map