import type { VueCons } from '../class';
import type { OptionBuilder } from '../optionBuilder';
import { type PropsConfig } from './props';
export type VModelConfig = PropsConfig & {
    name?: string;
};
export declare const decorator: {
    (): any;
    (option: VModelConfig): any;
    (proto: import("../identity").IdentityAny<import("../identity").IdentityType>, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function build(cons: VueCons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=vmodel.d.ts.map