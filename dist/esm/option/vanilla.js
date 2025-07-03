import { optionNullableMemberDecorator } from '../utils';
import { obtainSlot } from '../slot';
export const decorator = optionNullableMemberDecorator(function (proto, name) {
    const slot = obtainSlot(proto);
    const map = slot.obtainMap('vanilla');
    map.set(name, true);
});
//# sourceMappingURL=vanilla.js.map