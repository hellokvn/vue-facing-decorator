import { type ComponentCustomOptions, type MethodOptions } from 'vue';
import type { SetupContext } from 'vue';
import type { VueCons } from './class';
type SetupFunction<T> = (this: void, props: Readonly<any>, ctx: SetupContext<any>) => T | Promise<T>;
export type OptionSetupFunction = SetupFunction<any>;
export type ComponentSetupFunction = SetupFunction<Record<string, any>>;
type ComponentOption = {
    name?: string;
    emits?: string[];
    provide?: Record<string, any> | Function;
    components?: Record<string, any>;
    directives?: Record<string, any>;
    inheritAttrs?: boolean;
    expose?: string[];
    render?: Function;
    modifier?: (raw: any) => any;
    options?: ComponentCustomOptions & Record<string, any>;
    template?: string;
    mixins?: any[];
    setup?: ComponentSetupFunction;
    methods?: MethodOptions;
};
export declare const ComponentBase: {
    (): any;
    (option: ComponentOption): any;
    (cons: VueCons): any;
    (cons: VueCons, ctx: ClassDecoratorContext<abstract new (...args: any) => any>): any;
};
export declare function toNative<T extends VueCons>(cons: T): T;
export {};
//# sourceMappingURL=component.d.ts.map