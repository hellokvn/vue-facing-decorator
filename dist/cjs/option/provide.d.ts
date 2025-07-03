import type { VueCons } from '../class';
import type { OptionBuilder } from '../optionBuilder';
export type ProvideConfig = null | string;
export declare const decorator: {
    (): any;
    (option: string | null): any;
    (proto: import("../identity").IdentityAny<import("../identity").IdentityType>, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function build(cons: VueCons, optionBuilder: OptionBuilder, vueInstance: any): null | undefined;
//# sourceMappingURL=provide.d.ts.map