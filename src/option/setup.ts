/* src/option/setup.ts */
import { compatibleMemberDecorator } from '../deco3/utils'
import type { OptionSetupFunction } from '../component'
import type { VueCons } from '../class'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot } from '../slot'
import { instantiateComposable, isComposable } from '../composable'

export type SetupConfig = {
  setupFunction: OptionSetupFunction
}

export function decorator(setupFunction: OptionSetupFunction) {
  return compatibleMemberDecorator(function (proto: any, name: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('setup')
    map.set(name, {
      setupFunction
    })
  })
}

const isPromise = (v: any): v is Promise<any> => v instanceof Promise

// function tryInstantiateComposable(value: any, props: any, ctx: any): any {
//   if (typeof value === 'function' && value[ComposableSymbol]) {
//     return instantiateComposable(value, props, ctx)
//   }
//   return value
// }

export function build(cons: VueCons, optionBuilder: OptionBuilder) {
  const slot = obtainSlot(cons.prototype)
  const map = slot.getMap('setup')
  if (!map || map.size === 0) {
    return
  }

  const setup: OptionSetupFunction = function (props, ctx) {
    const setupData: Record<string, any> = {}
    let promises: Promise<any>[] | null = null

    for (const name of map.keys()) {
      let value = map.get(name)!.setupFunction(props, ctx)

      // 💡 Try to call composables that are accidentally passed as classes
      if (isComposable(value)) {
        value = instantiateComposable(value, props, ctx)
      }

      if (isPromise(value)) {
        promises ??= []
        promises.push(value.then((v) => {
          setupData[name] = v
        }))
      } else {
        setupData[name] = value
      }
    }

    if (promises) {
      return Promise.all(promises).then(() => setupData)
    }
    return setupData
  }

  optionBuilder.setup = setup
}
