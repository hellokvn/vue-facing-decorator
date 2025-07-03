import { obtainSlot } from './slot'
import { optionNullableClassDecorator } from './utils'
import {
    inject,
    ref,
    watch,
    getCurrentInstance,
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
    toRef,
} from 'vue'
import type { InjectConfig } from './option/inject'
import { toComponentReverse } from './utils'
import { Base } from './class'

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
  if (!(cons.prototype instanceof Base)) {
    throw new Error(
      `@Composable class "${cons.name}" must extend from "Vue" (vue-facing-decorator Base) to access Vue instance context like this.$router.`
    )
  }

  (cons as any)[ComposableSymbol] = true
})

export function isComposable(value: any): boolean {
  return typeof value === 'function' && value[ComposableSymbol] === true
}

export function instantiateComposable(Cls: any, props: any, ctx: any): any | Promise<any> {
  const protoChain = toComponentReverse(Cls.prototype)
  const allSlots = protoChain.map(p => obtainSlot(p))
  const sample = new Cls()

  const raw: Record<string, any> = {}
  const dataKeys = Object.keys(sample)
  dataKeys.forEach((key) => {
    raw[key] = ref(sample[key])
  })

  const inst: any = Object.create(Cls.prototype)
  for (const key of dataKeys) {
    Object.defineProperty(inst, key, {
      get: () => raw[key].value,
      set: (v) => { raw[key].value = v },
      enumerable: true,
    })
  }

  const instance = getCurrentInstance()
  if (instance && instance.proxy) {
    const proxy = instance.proxy as any
    for (const key of ['$router', '$route', '$el', '$emit', '$attrs', '$refs', '$slots']) {
      if (proxy[key] !== undefined) {
        inst[key] = proxy[key]
      }
    }
  }


  for (const slot of allSlots) {
    const propMap = slot.getMap('props')
    if (propMap) {
      for (const [key] of propMap) {
        if (key in props) {
          raw[key] = toRef(props, key)
        }
      }
    }
  }

  let promises: Promise<any>[] | null = null

  for (const slot of allSlots) {
    const setupMap: any = slot.getMap('setup')
    for (const name of setupMap?.keys() || []) {
      let value = setupMap.get(name)!.setupFunction(props, ctx)
      if (isComposable(value)) {
        value = instantiateComposable(value, props, ctx)
      }
      if (value instanceof Promise) {
        promises ??= []
        promises.push(value.then(v => { inst[name] = v }))
      } else {
        inst[name] = value
      }
    }
  }

  for (const slot of allSlots) {
    const injectMap = slot.getMap('inject')
    injectMap?.forEach((config: InjectConfig, name: string) => {
      const key: any = config.from ?? name
      inst[name] = inject(key, config.default)
    })
  }

  for (const proto of protoChain) {
    for (const hook in lifecycleMap) {
      const fn = proto[hook]
      if (typeof fn === 'function') {
        lifecycleMap[hook](() => fn.call(inst))
      }
    }
    if (typeof proto.created === 'function') {
      proto.created.call(inst)
    }
  }

  for (const slot of allSlots) {
    const watchMap = slot.getMap('watch')
    watchMap?.forEach((watchConfigs, name) => {
      const configs = Array.isArray(watchConfigs) ? watchConfigs : [watchConfigs]
      configs.forEach(conf => {
        const handler = conf.handler ?? inst[name]
        if (typeof handler !== 'function') return
        watch(() => raw[conf.key]?.value, (...args) => handler.apply(inst, args), {
          immediate: conf.immediate,
          deep: conf.deep,
        })
      })
    })
  }

  if (promises) {
    return Promise.all(promises).then(() => inst)
  }
  return inst
}
