import { obtainSlot } from './slot'
import { optionNullableClassDecorator } from './utils'

export const ComposableSymbol: unique symbol = Symbol('vue-facing-decorator-composable')

export const Composable = optionNullableClassDecorator<void>((cons: Function) => {
  (cons as any)[ComposableSymbol] = true
})

export function isComposable(value: any): boolean {
  return typeof value === 'function' && value[ComposableSymbol] === true
}

export function instantiateComposable(Cls: any, props: any, ctx: any): any | Promise<any> {
  const instance: any = new Cls()
  const slot = obtainSlot(Cls.prototype)
  const map = slot.getMap('setup')
  let promises: Promise<any>[] | null = null

  if (map && map.size > 0) {
    for (const name of map.keys()) {
      const setupState = map.get(name)!.setupFunction(props, ctx)
      if (setupState instanceof Promise) {
        promises ??= []
        promises.push(setupState.then(result => { instance[name] = result }))
      } else {
        instance[name] = setupState
      }
    }
  }

  if (promises) {
    return Promise.all(promises).then(() => instance)
  }

  return instance
}
