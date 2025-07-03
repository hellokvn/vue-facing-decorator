"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionNullableClassDecorator = exports.optionNullableMemberDecorator = exports.getProviderFunction = exports.getValidOwnPropertyNames = exports.filterNames = exports.getSuperSlot = exports.toComponentReverse = exports.getPrototypeOf = void 0;
const utils_1 = require("./deco3/utils");
const class_1 = require("./class");
const slot_1 = require("./slot");
function getPrototypeOf(proto) {
    const p = Object.getPrototypeOf(proto);
    if (!(p instanceof class_1.Base)) {
        return null;
    }
    return p;
}
exports.getPrototypeOf = getPrototypeOf;
function toComponentReverse(proto) {
    const arr = [];
    let curr = proto;
    do {
        arr.unshift(curr);
        curr = getPrototypeOf(curr);
    } while (curr !== null && !(0, slot_1.getSlot)(curr));
    return arr;
}
exports.toComponentReverse = toComponentReverse;
function getSuperSlot(proto) {
    let curr = getPrototypeOf(proto);
    while (curr !== null) {
        const slot = (0, slot_1.getSlot)(curr);
        if (slot) {
            return slot;
        }
        curr = getPrototypeOf(curr);
    }
    return null;
}
exports.getSuperSlot = getSuperSlot;
/**
 * Filter decorated names
 */
function filterNames(names, slot, mapNames) {
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
exports.filterNames = filterNames;
/**
 * Get own propertie name by a filter
 */
function getValidOwnPropertyNames(obj, filter) {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name));
}
exports.getValidOwnPropertyNames = getValidOwnPropertyNames;
/**
 * Transform provide into function.
 */
function getProviderFunction(provide) {
    if (typeof provide === 'function')
        return provide;
    return function () { return provide || {}; };
}
exports.getProviderFunction = getProviderFunction;
function optionNullableMemberDecorator(handler) {
    function decorator(optionOrProtoOrValue, nameOrCtx) {
        if (nameOrCtx) { //no option
            const protoOrValue = optionOrProtoOrValue;
            (0, utils_1.compatibleMemberDecorator)(function (proto, name) {
                handler(proto, name);
            })(protoOrValue, nameOrCtx);
        }
        else { //with option
            const option = optionOrProtoOrValue;
            return (0, utils_1.compatibleMemberDecorator)(function (proto, name) {
                handler(proto, name, option);
            });
        }
    }
    return decorator;
}
exports.optionNullableMemberDecorator = optionNullableMemberDecorator;
function optionNullableClassDecorator(handler) {
    function decorator(optionOrCons, ctx) {
        if (typeof optionOrCons === 'function') {
            const cons = optionOrCons;
            (0, utils_1.compatibleClassDecorator)(function (cons) {
                handler(cons);
            })(cons, ctx);
        }
        else {
            const option = optionOrCons;
            return (0, utils_1.compatibleClassDecorator)(function (cons) {
                handler(cons, option);
            });
        }
    }
    return decorator;
}
exports.optionNullableClassDecorator = optionNullableClassDecorator;
//# sourceMappingURL=utils.js.map