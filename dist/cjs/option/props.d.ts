import type { VueCons } from '../class';
import type { OptionBuilder } from '../optionBuilder';
export interface PropsConfig {
    type?: any;
    required?: boolean;
    default?: any;
    validator?(value: any): boolean;
}
export declare const decorator: {
    (): any;
    (option: PropsConfig): any;
    (proto: import("../identity").IdentityAny<import("../identity").IdentityType>, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function build(cons: VueCons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=props.d.ts.map