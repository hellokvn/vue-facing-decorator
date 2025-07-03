import { computed } from 'vue';
import { optionNullableMemberDecorator } from '../utils';
import { obtainSlot } from '../slot';
export const decorator = optionNullableMemberDecorator(function (proto, name, key) {
    const slot = obtainSlot(proto);
    const map = slot.obtainMap('provide');
    map.set(name, typeof key === 'undefined' ? null : key);
});
export function build(cons, optionBuilder, vueInstance) {
    var _a;
    (_a = optionBuilder.provide) !== null && _a !== void 0 ? _a : (optionBuilder.provide = {});
    const slot = obtainSlot(cons.prototype);
    const names = slot.obtainMap('provide');
    if (!names)
        return null;
    names.forEach((value, name) => {
        const key = value === null ? name : value;
        optionBuilder.provide[key] = computed(() => vueInstance[name]);
    });
}
//# sourceMappingURL=provide.js.map