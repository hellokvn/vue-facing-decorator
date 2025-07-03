import type { VueCons } from '../class';
import { type OptionBuilder } from '../optionBuilder';
export type RefConfig = null | string;
export declare const decorator: {
    (): any;
    (option: string): any;
    (proto: import("../identity").IdentityAny<import("../identity").IdentityType>, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function build(cons: VueCons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=ref.d.ts.map