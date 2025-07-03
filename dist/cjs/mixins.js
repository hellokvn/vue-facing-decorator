"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixins = void 0;
const component_1 = require("./component");
const slot_1 = require("./slot");
const class_1 = require("./class");
function mixins(...conses) {
    class MixinsClass extends class_1.Base {
    }
    (0, component_1.ComponentBase)({
        mixins: conses.map((cons => (0, slot_1.obtainSlot)(cons.prototype).cachedVueComponent))
    })(MixinsClass);
    return MixinsClass;
}
exports.mixins = mixins;
//# sourceMappingURL=mixins.js.map