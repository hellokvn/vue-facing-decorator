import { optionNullableMemberDecorator } from '../utils';
import { obtainSlot } from '../slot';
export const decorator = optionNullableMemberDecorator(function (proto, name, option) {
    const slot = obtainSlot(proto);
    const map = slot.obtainMap('props');
    const opt = Object.assign({}, option !== null && option !== void 0 ? option : {});
    map.set(name, opt);
});
export function build(cons, optionBuilder) {
    var _a;
    (_a = optionBuilder.props) !== null && _a !== void 0 ? _a : (optionBuilder.props = {});
    const slot = obtainSlot(cons.prototype);
    const names = slot.getMap('props');
    if (!names || names.size === 0) {
        return;
    }
    names.forEach((value, name) => {
        optionBuilder.props[name] = value;
    });
}
//# sourceMappingURL=props.js.map