import { Metadata } from 'facing-metadata';
const SlotSymbol = Symbol('vue-facing-decorator-slot');
export class Slot {
    constructor(master) {
        Object.defineProperty(this, "master", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "names", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "inComponent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "cachedVueComponent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.master = master;
    }
    obtainMap(name) {
        let map = this.getMap(name);
        if (!map) {
            map = new Map();
            this.names.set(name, map);
        }
        return map;
    }
    getMap(name) {
        const map = this.names.get(name);
        return map;
    }
}
const metadata = new Metadata(SlotSymbol);
export function makeSlot(obj, defaultSlot) {
    if (getSlot(obj)) {
        throw '';
    }
    if (defaultSlot) {
        defaultSlot.master = obj;
    }
    const slot = defaultSlot !== null && defaultSlot !== void 0 ? defaultSlot : new Slot(obj);
    metadata.create(obj, slot);
    return slot;
}
export function getSlot(obj) {
    return metadata.getOwn(obj);
}
export function obtainSlot(obj, defaultSlot) {
    const slot = getSlot(obj);
    if (slot) {
        return slot;
    }
    return makeSlot(obj, defaultSlot);
}
//# sourceMappingURL=slot.js.map