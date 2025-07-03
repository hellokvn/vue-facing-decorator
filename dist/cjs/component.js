"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNative = exports.ComponentBase = void 0;
const vue_1 = require("vue");
const slot_1 = require("./slot");
const utils_1 = require("./utils");
const setup_1 = require("./option/setup");
const computed_1 = require("./option/computed");
const data_1 = require("./option/data");
const methodsAndHooks_1 = require("./option/methodsAndHooks");
const ref_1 = require("./option/ref");
const watch_1 = require("./option/watch");
const props_1 = require("./option/props");
const inject_1 = require("./option/inject");
const provide_1 = require("./option/provide");
const emit_1 = require("./option/emit");
const vmodel_1 = require("./option/vmodel");
const accessor_1 = require("./option/accessor");
function componentOptionFactory(cons, extend) {
    const optionBuilder = {};
    (0, setup_1.build)(cons, optionBuilder);
    (0, vmodel_1.build)(cons, optionBuilder);
    (0, computed_1.build)(cons, optionBuilder); //after VModel
    (0, watch_1.build)(cons, optionBuilder);
    (0, props_1.build)(cons, optionBuilder);
    (0, inject_1.build)(cons, optionBuilder);
    (0, emit_1.build)(cons, optionBuilder);
    (0, ref_1.build)(cons, optionBuilder); //after Computed
    (0, accessor_1.build)(cons, optionBuilder);
    (0, methodsAndHooks_1.build)(cons, optionBuilder); //the last one
    const raw = Object.assign(Object.assign({ name: cons.name, setup: optionBuilder.setup, data() {
            var _a;
            delete optionBuilder.data;
            (0, data_1.build)(cons, optionBuilder);
            return (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : {};
        }, methods: optionBuilder.methods, computed: optionBuilder.computed, watch: optionBuilder.watch, props: optionBuilder.props, inject: optionBuilder.inject, provide() {
            var _a;
            (0, provide_1.build)(cons, optionBuilder, this);
            return (_a = optionBuilder.provide) !== null && _a !== void 0 ? _a : {};
        } }, optionBuilder.hooks), { extends: extend });
    return raw;
}
function buildComponent(cons, arg, extend) {
    var _a, _b;
    const option = componentOptionFactory(cons, extend);
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    Object.keys(arg).reduce((option, name) => {
        if (['options', 'modifier', 'methods', 'emits', 'setup', 'provide'].includes(name)) {
            return option;
        }
        option[name] = arg[name];
        return option;
    }, option);
    //apply event emits
    let emits = Array.from(slot.obtainMap('emits').keys());
    if (Array.isArray(arg.emits)) {
        emits = Array.from(new Set([...emits, ...arg.emits]));
    }
    option.emits = emits;
    //merge methods
    if ('object' === typeof arg.methods && !Array.isArray(arg.methods) && arg.methods !== null) {
        (_a = option.methods) !== null && _a !== void 0 ? _a : (option.methods = {});
        Object.assign(option.methods, arg.methods);
    }
    //merge setup function
    if (!option.setup) {
        option.setup = arg.setup;
    }
    else {
        const oldSetup = option.setup;
        const newSetup = (_b = arg.setup) !== null && _b !== void 0 ? _b : function () { return {}; };
        const setup = function (props, ctx) {
            const newRet = newSetup(props, ctx);
            const oldRet = oldSetup(props, ctx);
            if (oldRet instanceof Promise || newRet instanceof Promise) {
                return Promise.all([newRet, oldRet]).then((arr) => {
                    return Object.assign({}, arr[0], arr[1]);
                });
            }
            else {
                return Object.assign({}, newRet, oldRet);
            }
        };
        option.setup = setup;
    }
    //merge provide function
    const oldProvider = (0, utils_1.getProviderFunction)(option.provide);
    const newProvider = (0, utils_1.getProviderFunction)(arg.provide);
    option.provide = function () {
        return Object.assign({}, oldProvider.call(this), newProvider.call(this));
    };
    //custom decorator
    const map = slot.getMap('customDecorator');
    if (map && map.size > 0) {
        map.forEach((v) => {
            v.forEach(ite => ite.creator.apply({}, [option, ite.key]));
        });
    }
    //shallow merge options
    if (arg.options) {
        Object.assign(option, arg.options);
    }
    //apply modifier
    if (arg.modifier) {
        arg.modifier(option);
    }
    return (0, vue_1.defineComponent)(option);
}
function build(cons, option) {
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    slot.inComponent = true;
    const superSlot = (0, utils_1.getSuperSlot)(cons.prototype);
    if (superSlot) {
        if (!superSlot.inComponent) {
            throw 'Class should be decorated by Component or ComponentBase: ' + slot.master;
        }
        if (superSlot.cachedVueComponent === null) {
            throw 'Component decorator 1';
        }
    }
    const component = buildComponent(cons, option, superSlot === null ? undefined : superSlot.cachedVueComponent);
    component.__vfdConstructor = cons;
    slot.cachedVueComponent = component;
    cons.__vccOpts = component;
}
exports.ComponentBase = (0, utils_1.optionNullableClassDecorator)((cons, option) => {
    build(cons, option !== null && option !== void 0 ? option : {});
});
function toNative(cons) {
    const slot = (0, slot_1.obtainSlot)(cons.prototype);
    if (!slot.inComponent) {
        throw 'to native 1';
    }
    const cached = slot.cachedVueComponent;
    if (!cached) {
        throw 'to native 2';
    }
    return cached;
}
exports.toNative = toNative;
//# sourceMappingURL=component.js.map