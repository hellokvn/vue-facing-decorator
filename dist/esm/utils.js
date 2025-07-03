import { compatibleMemberDecorator, compatibleClassDecorator } from './deco3/utils';
import { Base } from './class';
import { getSlot } from './slot';
export function getPrototypeOf(proto) {
    const p = Object.getPrototypeOf(proto);
    if (!(p instanceof Base)) {
        return null;
    }
    return p;
}
export function toComponentReverse(proto) {
    const arr = [];
    let curr = proto;
    do {
        arr.unshift(curr);
        curr = getPrototypeOf(curr);
    } while (curr !== null && !getSlot(curr));
    return arr;
}
export function getSuperSlot(proto) {
    let curr = getPrototypeOf(proto);
    while (curr !== null) {
        const slot = getSlot(curr);
        if (slot) {
            return slot;
        }
        curr = getPrototypeOf(curr);
    }
    return null;
}
/**
 * Filter decorated names
 */
export function filterNames(names, slot, mapNames) {
    return names.filter(name => {
        let currSlot = slot;
        while (currSlot != null) {
            for (const mapName of currSlot.names.keys()) {
                if (mapName === 'customDecorator') {
                    const map = currSlot.obtainMap('customDecorator');
                    if (map.has(name)) {
                        if (map.get(name).every(ite => !ite.preserve)) {
                            return false;
                        }
                    }
                }
                if (mapNames && mapNames.includes(mapName)) {
                    continue;
                }
                const map = currSlot.names.get(mapName);
                if (map.has(name)) {
                    return false;
                }
            }
            currSlot = getSuperSlot(currSlot.master);
        }
        return true;
    });
}
/**
 * Get own propertie name by a filter
 */
export function getValidOwnPropertyNames(obj, filter) {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name));
}
/**
 * Transform provide into function.
 */
export function getProviderFunction(provide) {
    if (typeof provide === 'function')
        return provide;
    return function () { return provide || {}; };
}
export function optionNullableMemberDecorator(handler) {
    function decorator(optionOrProtoOrValue, nameOrCtx) {
        if (nameOrCtx) { //no option
            const protoOrValue = optionOrProtoOrValue;
            compatibleMemberDecorator(function (proto, name) {
                handler(proto, name);
            })(protoOrValue, nameOrCtx);
        }
        else { //with option
            const option = optionOrProtoOrValue;
            return compatibleMemberDecorator(function (proto, name) {
                handler(proto, name, option);
            });
        }
    }
    return decorator;
}
export function optionNullableClassDecorator(handler) {
    function decorator(optionOrCons, ctx) {
        if (typeof optionOrCons === 'function') {
            const cons = optionOrCons;
            compatibleClassDecorator(function (cons) {
                handler(cons);
            })(cons, ctx);
        }
        else {
            const option = optionOrCons;
            return compatibleClassDecorator(function (cons) {
                handler(cons, option);
            });
        }
    }
    return decorator;
}
//# sourceMappingURL=utils.js.map