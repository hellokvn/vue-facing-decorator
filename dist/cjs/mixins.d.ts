import type { VueCons } from './class';
import type { MergeIdentityType, IdentitySymbol } from './identity';
type MixedClass<Mixins extends VueCons[], Base extends VueCons = VueCons> = Mixins extends [infer T extends VueCons, ...infer E extends VueCons[]] ? MixedClass<E, VueCons<InstanceType<Base> & InstanceType<T>, MergeIdentityType<InstanceType<T>[typeof IdentitySymbol], InstanceType<Base>[typeof IdentitySymbol]>>> : Base;
export declare function mixins<T extends VueCons[]>(...conses: T): MixedClass<T, VueCons>;
export {};
//# sourceMappingURL=mixins.d.ts.map