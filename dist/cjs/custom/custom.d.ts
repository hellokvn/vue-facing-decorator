type Creator = {
    (options: any, key: string): void;
};
export interface Record {
    key: string;
    creator: Creator;
    preserve: boolean;
}
export declare function createDecorator(creator: Creator, opt?: {
    preserve?: boolean;
}): (protoOrValue: any, nameOrCtx: string | ClassMemberDecoratorContext) => any;
export {};
//# sourceMappingURL=custom.d.ts.map