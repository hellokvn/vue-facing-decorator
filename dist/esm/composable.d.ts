export declare const ComposableSymbol: unique symbol;
export declare const Composable: {
    (): any;
    (option: void): any;
    (cons: import("./class").VueCons): any;
    (cons: import("./class").VueCons, ctx: ClassDecoratorContext<abstract new (...args: any) => any>): any;
};
export declare function isComposable(value: any): boolean;
export declare function instantiateComposable(Cls: any, props: any, ctx: any): any | Promise<any>;
//# sourceMappingURL=composable.d.ts.map