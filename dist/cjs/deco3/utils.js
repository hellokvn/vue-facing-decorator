"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compatibleMemberDecorator = exports.compatibleClassDecorator = exports.Compatible = void 0;
const slot_1 = require("../slot");
exports.Compatible = {};
function compatibleClassDecorator(deco) {
    return function (cons, ctx) {
        var _a;
        if (ctx) { //stage 3 arg is constructor, ctx is ClassDecoratorContext
            if (ctx.kind !== 'class') {
                throw 'deco stage 3 class';
            }
            const proto = (_a = exports.Compatible.fakePrototype) !== null && _a !== void 0 ? _a : (exports.Compatible.fakePrototype = {});
            const slot = (0, slot_1.obtainSlot)(proto);
            delete exports.Compatible.fakePrototype;
            (0, slot_1.obtainSlot)(cons.prototype, slot);
            const ret = deco(cons);
            return ret;
        }
        else { //stage 2 arg is constructor
            return deco(cons);
        }
    };
}
exports.compatibleClassDecorator = compatibleClassDecorator;
function compatibleMemberDecorator(deco) {
    return function (protoOrValue, nameOrCtx) {
        var _a;
        if (typeof nameOrCtx === 'object') { //stage 3 arg is value, ctx is ClassMemberDecoratorContext
            const ctx = nameOrCtx;
            const value = protoOrValue;
            const proto = (_a = exports.Compatible.fakePrototype) !== null && _a !== void 0 ? _a : (exports.Compatible.fakePrototype = {});
            proto[ctx.name] = value;
            return deco(proto, ctx.name);
        }
        else { //stage 2 arg is prototype, ctx is name stirng
            const name = nameOrCtx;
            const proto = protoOrValue;
            return deco(proto, name);
        }
    };
}
exports.compatibleMemberDecorator = compatibleMemberDecorator;
//# sourceMappingURL=utils.js.map