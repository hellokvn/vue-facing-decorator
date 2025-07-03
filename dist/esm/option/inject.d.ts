import type { InjectionKey } from 'vue';
import type { VueCons } from '../class';
import type { OptionBuilder } from '../optionBuilder';
export interface InjectConfig {
    from?: string | symbol | Symbol | InjectionKey<any>;
    default?: any;
}
export declare const decorator: {
    (): any;
    (option: InjectConfig): any;
    (proto: import("../identity").IdentityAny<import("../identity").IdentityType>, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function build(cons: VueCons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=inject.d.ts.map