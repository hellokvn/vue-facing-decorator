import { obtainSlot } from './slot';
import { optionNullableClassDecorator } from './utils';
import { inject, ref, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onRenderTracked, onRenderTriggered, onErrorCaptured, onServerPrefetch, } from 'vue';
export const ComposableSymbol = Symbol('vue-facing-decorator-composable');
const lifecycleMap = {
    beforeMount: onBeforeMount,
    mounted: onMounted,
    beforeUpdate: onBeforeUpdate,
    updated: onUpdated,
    beforeUnmount: onBeforeUnmount,
    unmounted: onUnmounted,
    activated: onActivated,
    deactivated: onDeactivated,
    renderTracked: onRenderTracked,
    renderTriggered: onRenderTriggered,
    errorCaptured: onErrorCaptured,
    serverPrefetch: onServerPrefetch,
};
export const Composable = optionNullableClassDecorator((cons) => {
    cons[ComposableSymbol] = true;
});
export function isComposable(value) {
    return typeof value === 'function' && value[ComposableSymbol] === true;
}
export function instantiateComposable(Cls, props, ctx) {
    const slot = obtainSlot(Cls.prototype);
    const sample = new Cls();
    // Make all fields reactive
    const raw = {};
    const keys = Object.keys(sample);
    keys.forEach((key) => {
        raw[key] = ref(sample[key]);
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
            inst[name] = inject(key, config.default);
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
                watch(() => { var _a; return (_a = raw[conf.key]) === null || _a === void 0 ? void 0 : _a.value; }, (...args) => handler.apply(inst, args), {
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
//# sourceMappingURL=composable.js.map