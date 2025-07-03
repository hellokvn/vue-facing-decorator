import type { IdentityType, MergeIdentityType, IdentitySymbol } from '../identity';
import type { VueCons } from '../class';
export declare function TSX<Properties extends IdentityType['props'] = {}, Events extends IdentityType['events'] = {}, IT extends IdentityType = {
    props: Properties;
    events: Events;
}>(): <C extends VueCons>(cons: C) => VueCons<InstanceType<C>, MergeIdentityType<IT, InstanceType<C>[typeof IdentitySymbol]>>;
//# sourceMappingURL=type.d.ts.map