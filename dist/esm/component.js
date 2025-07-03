import { defineComponent } from 'vue';
import { obtainSlot } from './slot';
import { getSuperSlot, getProviderFunction, optionNullableClassDecorator } from './utils';
import { build as optionSetup } from './option/setup';
import { build as optionComputed } from './option/computed';
import { build as optionData } from './option/data';
import { build as optionMethodsAndHooks } from './option/methodsAndHooks';
import { build as optionRef } from './option/ref';
import { build as optionWatch } from './option/watch';
import { build as optionProps } from './option/props';
import { build as optionInject } from './option/inject';
import { build as optionProvide } from './option/provide';
import { build as optionEmit } from './option/emit';
import { build as optionVModel } from './option/vmodel';
import { build as optionAccessor } from './option/accessor';
function componentOptionFactory(cons, extend) {
    const optionBuilder = {};
    optionSetup(cons, optionBuilder);
    optionVModel(cons, optionBuilder);
    optionComputed(cons, optionBuilder); //after VModel
    optionWatch(cons, optionBuilder);
    optionProps(cons, optionBuilder);
    optionInject(cons, optionBuilder);
    optionEmit(cons, optionBuilder);
    optionRef(cons, optionBuilder); //after Computed
    optionAccessor(cons, optionBuilder);
    optionMethodsAndHooks(cons, optionBuilder); //the last one
    const raw = Object.assign(Object.assign({ name: cons.name, setup: optionBuilder.setup, data() {
            var _a;
            delete optionBuilder.data;
            optionData(cons, optionBuilder);
            return (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : {};
        }, methods: optionBuilder.methods, computed: optionBuilder.computed, watch: optionBuilder.watch, props: optionBuilder.props, inject: optionBuilder.inject, provide() {
            var _a;
            optionProvide(cons, optionBuilder, this);
            return (_a = optionBuilder.provide) !== null && _a !== void 0 ? _a : {};
        } }, optionBuilder.hooks), { extends: extend });
    return raw;
}
function buildComponent(cons, arg, extend) {
    var _a, _b;
    const option = componentOptionFactory(cons, extend);
    const slot = obtainSlot(cons.prototype);
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
    const oldProvider = getProviderFunction(option.provide);
    const newProvider = getProviderFunction(arg.provide);
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
    return defineComponent(option);
}
function build(cons, option) {
    const slot = obtainSlot(cons.prototype);
    slot.inComponent = true;
    const superSlot = getSuperSlot(cons.prototype);
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
export const ComponentBase = optionNullableClassDecorator((cons, option) => {
    build(cons, option !== null && option !== void 0 ? option : {});
});
export function toNative(cons) {
    const slot = obtainSlot(cons.prototype);
    if (!slot.inComponent) {
        throw 'to native 1';
    }
    const cached = slot.cachedVueComponent;
    if (!cached) {
        throw 'to native 2';
    }
    return cached;
}
//# sourceMappingURL=component.js.map