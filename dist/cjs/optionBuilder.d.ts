import type { WatchConfig } from './option/watch';
import type { PropsConfig } from './option/props';
import type { InjectConfig } from './option/inject';
import type { OptionSetupFunction } from './component';
export interface OptionBuilder {
    name?: string;
    data?: Record<string, any>;
    methods?: Record<string, Function>;
    hooks?: Record<string, Function>;
    computed?: Record<string, any>;
    watch?: Record<string, WatchConfig | WatchConfig[]>;
    props?: Record<string, PropsConfig>;
    provide?: Record<string, any>;
    inject?: Record<string, InjectConfig>;
    setup?: OptionSetupFunction;
    beforeCreateCallbacks?: Function[];
}
export declare function applyAccessors(optionBuilder: OptionBuilder, dataFunc: (ctx: any) => Map<string, {
    get: (() => any) | undefined;
    set: ((v: any) => any) | undefined;
}>): void;
//# sourceMappingURL=optionBuilder.d.ts.map