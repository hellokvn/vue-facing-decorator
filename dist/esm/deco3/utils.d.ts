import { VueCons } from '../class';
export declare const Compatible: {
    fakePrototype?: any;
};
export declare function compatibleClassDecorator(deco: Function): (cons: VueCons, ctx?: ClassDecoratorContext) => any;
export declare function compatibleMemberDecorator(deco: Function): (protoOrValue: any, nameOrCtx: ClassMemberDecoratorContext | string) => any;
//# sourceMappingURL=utils.d.ts.map