import type { IdentityAny } from './identity';
import { type VueCons } from './class';
import { type Slot, type SlotMapNames } from './slot';
export declare function getPrototypeOf(proto: IdentityAny): IdentityAny | null;
export declare function toComponentReverse(proto: IdentityAny): IdentityAny<import("./identity").IdentityType>[];
export declare function getSuperSlot(proto: IdentityAny): Slot | null;
/**
 * Filter decorated names
 */
export declare function filterNames(names: string[], slot: Slot, mapNames?: SlotMapNames[]): string[];
/**
 * Get own propertie name by a filter
 */
export declare function getValidOwnPropertyNames(obj: any, filter: (des: PropertyDescriptor, name: string) => boolean): string[];
/**
 * Transform provide into function.
 */
export declare function getProviderFunction(provide: any): () => {};
export declare function optionNullableMemberDecorator<T>(handler: {
    (proto: any, name: string, option?: T): any;
}): {
    (): any;
    (option: T): any;
    (proto: IdentityAny, name: any): any;
    (value: any, ctx: ClassMemberDecoratorContext): any;
};
export declare function optionNullableClassDecorator<T>(handler: {
    (cons: VueCons, option?: T): any;
}): {
    (): any;
    (option: T): any;
    (cons: VueCons): any;
    (cons: VueCons, ctx: ClassDecoratorContext): any;
};
//# sourceMappingURL=utils.d.ts.map