import { obtainSlot } from './slot'
import { optionNullableClassDecorator } from './utils'
import {
    inject,
    ref,
    watch,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    onActivated,
    onDeactivated,
    onRenderTracked,
    onRenderTriggered,
    onErrorCaptured,
    onServerPrefetch,
} from 'vue'
import type { InjectConfig } from './option/inject'

export const ComposableSymbol: unique symbol = Symbol('vue-facing-decorator-composable')

const lifecycleMap: Record<string, Function> = {
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
}

export const Composable = optionNullableClassDecorator<void>((cons: Function) => {
  (cons as any)[ComposableSymbol] = true
})

export function isComposable(value: any): boolean {
  return typeof value === 'function' && value[ComposableSymbol] === true
}

export function instantiateComposable(Cls: any, props: any, ctx: any): any | Promise<any> {
  const slot = obtainSlot(Cls.prototype)
  const sample = new Cls()
  const raw: Record<string, any> = {}
  const keys = Object.keys(sample)

  keys.forEach((key) => {
    raw[key] = ref(sample[key])
  })

  const inst: any = Object.create(Cls.prototype)
  for (const key of keys) {
    Object.defineProperty(inst, key, {
      get: () => raw[key].value,
      set: (v) => { raw[key].value = v },
      enumerable: true,
    })
  }

  const setupMap = slot.getMap('setup')
  let promises: Promise<any>[] | null = null

  if (setupMap && setupMap.size > 0) {
    for (const name of setupMap.keys()) {
      let setupVal = setupMap.get(name)!.setupFunction(props, ctx)

      if (isComposable(setupVal)) {
        setupVal = instantiateComposable(setupVal, props, ctx)
      }

      if (setupVal instanceof Promise) {
        promises ??= []
        promises.push(setupVal.then((v) => { inst[name] = v }))
      } else {
        inst[name] = setupVal
      }
    }
  }

  const injectMap = slot.getMap('inject')
  if (injectMap && injectMap.size > 0) {
    injectMap.forEach((config: InjectConfig, name: string) => {
      const key = config.from ?? name
      inst[name] = inject(key, config.default)
    })
  }

  const proto = Cls.prototype
  Object.keys(lifecycleMap).forEach((hook) => {
    if (typeof proto[hook] === 'function') {
      lifecycleMap[hook](() => proto[hook].call(inst))
    }
  })

  if (typeof proto.created === 'function') {
    proto.created.call(inst)
  }

  const watchMap = slot.getMap('watch')
  if (watchMap && watchMap.size > 0) {
    watchMap.forEach((watchConfigs, name) => {
      const configs = Array.isArray(watchConfigs) ? watchConfigs : [watchConfigs]
      configs.forEach((conf) => {
        const handler = conf.handler ?? inst[name]
        if (typeof handler !== 'function') return
        watch(
          () => raw[conf.key]?.value,
          (...args) => handler.apply(inst, args),
          {
            immediate: conf.immediate,
            deep: conf.deep,
          }
        )
      })
    })
  }

  if (promises) {
    return Promise.all(promises).then(() => inst)
  }

  return inst
}
