"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantiateComposable = exports.isComposable = exports.Composable = exports.ComposableSymbol = void 0;
const slot_1 = require("./slot");
const utils_1 = require("./utils");
const vue_1 = require("vue");
exports.ComposableSymbol = Symbol('vue-facing-decorator-composable');
const lifecycleMap = {
    beforeMount: vue_1.onBeforeMount,
    mounted: vue_1.onMounted,
    beforeUpdate: vue_1.onBeforeUpdate,
    updated: vue_1.onUpdated,
    beforeUnmount: vue_1.onBeforeUnmount,
    unmounted: vue_1.onUnmounted,
    activated: vue_1.onActivated,
    deactivated: vue_1.onDeactivated,
    renderTracked: vue_1.onRenderTracked,
    renderTriggered: vue_1.onRenderTriggered,
    errorCaptured: vue_1.onErrorCaptured,
    serverPrefetch: vue_1.onServerPrefetch,
};
exports.Composable = (0, utils_1.optionNullableClassDecorator)((cons) => {
    cons[exports.ComposableSymbol] = true;
});
function isComposable(value) {
    return typeof value === 'function' && value[exports.ComposableSymbol] === true;
}
exports.isComposable = isComposable;
function instantiateComposable(Cls, props, ctx) {
    const slot = (0, slot_1.obtainSlot)(Cls.prototype);
    const sample = new Cls();
    // Make all fields reactive
    const raw = {};
    const keys = Object.keys(sample);
    keys.forEach((key) => {
        raw[key] = (0, vue_1.ref)(sample[key]);
    });
    const inst = Object.create(Cls.prototype);
    for (const key of keys) {
        Object.defineProperty(inst, key, {
            get: () => raw[key].value,
            set: (v) => { raw[key].value = v; },
            enumerable: true,
        });
    }
    // Setup @Setup fields
    const setupMap = slot.getMap('setup');
    let promises = null;
    if (setupMap && setupMap.size > 0) {
        for (const name of setupMap.keys()) {
            let setupVal = setupMap.get(name).setupFunction(props, ctx);
            // 💡 recursively resolve @Composable classes
            if (isComposable(setupVal)) {
                setupVal = instantiateComposable(setupVal, props, ctx);
            }
            if (setupVal instanceof Promise) {
                promises !== null && promises !== void 0 ? promises : (promises = []);
                promises.push(setupVal.then((v) => { inst[name] = v; }));
            }
            else {
                inst[name] = setupVal;
            }
        }
    }
    // Setup @Inject fields
    const injectMap = slot.getMap('inject');
    if (injectMap && injectMap.size > 0) {
        injectMap.forEach((config, name) => {
            var _a;
            const key = (_a = config.from) !== null && _a !== void 0 ? _a : name;
            inst[name] = (0, vue_1.inject)(key, config.default);
        });
    }
    // Lifecycle hooks
    const proto = Cls.prototype;
    Object.keys(lifecycleMap).forEach((hook) => {
        if (typeof proto[hook] === 'function') {
            lifecycleMap[hook](() => proto[hook].call(inst));
        }
    });
    // created()
    if (typeof proto.created === 'function') {
        proto.created.call(inst);
    }
    // Setup watchers
    const watchMap = slot.getMap('watch');
    if (watchMap && watchMap.size > 0) {
        watchMap.forEach((watchConfigs, name) => {
            const configs = Array.isArray(watchConfigs) ? watchConfigs : [watchConfigs];
            configs.forEach((conf) => {
                var _a;
                const handler = (_a = conf.handler) !== null && _a !== void 0 ? _a : inst[name];
                if (typeof handler !== 'function')
                    return;
                (0, vue_1.watch)(() => { var _a; return (_a = raw[conf.key]) === null || _a === void 0 ? void 0 : _a.value; }, (...args) => handler.apply(inst, args), {
                    immediate: conf.immediate,
                    deep: conf.deep,
                });
            });
        });
    }
    if (promises) {
        return Promise.all(promises).then(() => inst);
    }
    return inst;
}
exports.instantiateComposable = instantiateComposable;
//# sourceMappingURL=composable.js.map