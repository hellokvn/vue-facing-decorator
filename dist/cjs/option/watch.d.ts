import type { VueCons } from '../class';
import type { OptionBuilder } from '../optionBuilder';
import type { WatchCallback } from 'vue';
export interface WatchConfig {
    key: string;
    handler: WatchCallback;
    flush?: 'post';
    deep?: boolean;
    immediate?: boolean;
}
type Option = Omit<WatchConfig, 'handler' | 'key'>;
export declare function decorator(key: string, option?: Option): (protoOrValue: any, nameOrCtx: string | ClassMemberDecoratorContext) => any;
export declare function build(cons: VueCons, optionBuilder: OptionBuilder): void;
export {};
//# sourceMappingURL=watch.d.ts.map