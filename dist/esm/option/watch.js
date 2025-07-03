import { obtainSlot } from '../slot';
import { compatibleMemberDecorator } from '../deco3/utils';
export function decorator(key, option) {
    return compatibleMemberDecorator(function (proto, name) {
        const slot = obtainSlot(proto);
        const map = slot.obtainMap('watch');
        const opt = Object.assign({}, option !== null && option !== void 0 ? option : {}, {
            key: key,
            handler: proto[name]
        });
        if (map.has(name)) {
            const t = map.get(name);
            if (Array.isArray(t)) {
                t.push(opt);
            }
            else {
                map.set(name, [t, opt]);
            }
        }
        else {
            map.set(name, opt);
        }
    });
}
export function build(cons, optionBuilder) {
    var _a;
    (_a = optionBuilder.watch) !== null && _a !== void 0 ? _a : (optionBuilder.watch = {});
    const slot = obtainSlot(cons.prototype);
    const names = slot.getMap('watch');
    if (!names || names.size === 0) {
        return;
    }
    names.forEach((value, _name) => {
        const values = Array.isArray(value) ? value : [value];
        values.forEach(v => {
            if (!optionBuilder.watch[v.key]) {
                optionBuilder.watch[v.key] = v;
            }
            else {
                const t = optionBuilder.watch[v.key];
                if (Array.isArray(t)) {
                    t.push(v);
                }
                else {
                    optionBuilder.watch[v.key] = [t, v];
                }
            }
        });
    });
}
//# sourceMappingURL=watch.js.map