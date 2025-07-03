import type { OptionSetupFunction } from '../component';
import type { VueCons } from '../class';
import type { OptionBuilder } from '../optionBuilder';
export type SetupConfig = {
    setupFunction: OptionSetupFunction;
};
export declare function decorator(setupFunction: OptionSetupFunction): (protoOrValue: any, nameOrCtx: string | ClassMemberDecoratorContext) => any;
export declare function build(cons: VueCons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=setup.d.ts.map