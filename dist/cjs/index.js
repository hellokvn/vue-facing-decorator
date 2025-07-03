"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composable = exports.toNative = exports.Vue = exports.Base = exports.TSX = exports.mixins = exports.createDecorator = exports.Hook = exports.Vanilla = exports.Model = exports.VModel = exports.Emit = exports.Inject = exports.Provide = exports.Prop = exports.Watch = exports.Ref = exports.Setup = exports.Component = exports.ComponentBase = void 0;
var component_1 = require("./component");
Object.defineProperty(exports, "ComponentBase", { enumerable: true, get: function () { return component_1.ComponentBase; } });
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return component_1.ComponentBase; } });
var setup_1 = require("./option/setup");
Object.defineProperty(exports, "Setup", { enumerable: true, get: function () { return setup_1.decorator; } });
var ref_1 = require("./option/ref");
Object.defineProperty(exports, "Ref", { enumerable: true, get: function () { return ref_1.decorator; } });
var watch_1 = require("./option/watch");
Object.defineProperty(exports, "Watch", { enumerable: true, get: function () { return watch_1.decorator; } });
var props_1 = require("./option/props");
Object.defineProperty(exports, "Prop", { enumerable: true, get: function () { return props_1.decorator; } });
var provide_1 = require("./option/provide");
Object.defineProperty(exports, "Provide", { enumerable: true, get: function () { return provide_1.decorator; } });
var inject_1 = require("./option/inject");
Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return inject_1.decorator; } });
var emit_1 = require("./option/emit");
Object.defineProperty(exports, "Emit", { enumerable: true, get: function () { return emit_1.decorator; } });
var vmodel_1 = require("./option/vmodel");
Object.defineProperty(exports, "VModel", { enumerable: true, get: function () { return vmodel_1.decorator; } });
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return vmodel_1.decorator; } });
var vanilla_1 = require("./option/vanilla");
Object.defineProperty(exports, "Vanilla", { enumerable: true, get: function () { return vanilla_1.decorator; } });
var methodsAndHooks_1 = require("./option/methodsAndHooks");
Object.defineProperty(exports, "Hook", { enumerable: true, get: function () { return methodsAndHooks_1.decorator; } });
var custom_1 = require("./custom/custom");
Object.defineProperty(exports, "createDecorator", { enumerable: true, get: function () { return custom_1.createDecorator; } });
var mixins_1 = require("./mixins");
Object.defineProperty(exports, "mixins", { enumerable: true, get: function () { return mixins_1.mixins; } });
var type_1 = require("./tsx/type");
Object.defineProperty(exports, "TSX", { enumerable: true, get: function () { return type_1.TSX; } });
var class_1 = require("./class");
Object.defineProperty(exports, "Base", { enumerable: true, get: function () { return class_1.Base; } });
Object.defineProperty(exports, "Vue", { enumerable: true, get: function () { return class_1.Base; } });
__exportStar(require("./hooks"), exports);
var component_2 = require("./component");
Object.defineProperty(exports, "toNative", { enumerable: true, get: function () { return component_2.toNative; } });
var composable_1 = require("./composable");
Object.defineProperty(exports, "Composable", { enumerable: true, get: function () { return composable_1.Composable; } });
//# sourceMappingURL=index.js.map