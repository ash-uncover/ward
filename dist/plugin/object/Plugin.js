"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Plugin_loadUrl, _Plugin_name, _Plugin_url, _Plugin_dependencies, _Plugin_defines, _Plugin_provides;
Object.defineProperty(exports, "__esModule", { value: true });
const PluginDefine_1 = __importDefault(require("./PluginDefine"));
const PluginProvide_1 = __importDefault(require("./PluginProvide"));
class Plugin {
    constructor(loadUrl, data) {
        _Plugin_loadUrl.set(this, void 0);
        _Plugin_name.set(this, void 0);
        _Plugin_url.set(this, void 0);
        _Plugin_dependencies.set(this, void 0);
        _Plugin_defines.set(this, void 0);
        _Plugin_provides.set(this, void 0);
        __classPrivateFieldSet(this, _Plugin_loadUrl, loadUrl, "f");
        __classPrivateFieldSet(this, _Plugin_name, data.name, "f");
        __classPrivateFieldSet(this, _Plugin_url, data.url, "f");
        __classPrivateFieldSet(this, _Plugin_dependencies, (data.dependencies || []), "f");
        const defines = data.defines || {};
        __classPrivateFieldSet(this, _Plugin_defines, Object.keys(defines).map((defineName) => {
            const define = defines[defineName];
            return new PluginDefine_1.default(this.name, defineName, define);
        }), "f");
        const provides = data.provides || {};
        __classPrivateFieldSet(this, _Plugin_provides, Object.keys(provides).reduce((acc, defineName) => {
            const provide = provides[defineName];
            const providers = Object.keys(provide).map((provideName) => {
                return new PluginProvide_1.default(this.name, defineName, provideName, provide[provideName]);
            }, []);
            return [...acc, ...providers];
        }, []), "f");
    }
    get loadUrl() { return __classPrivateFieldGet(this, _Plugin_loadUrl, "f"); }
    get name() { return __classPrivateFieldGet(this, _Plugin_name, "f"); }
    get url() { return __classPrivateFieldGet(this, _Plugin_url, "f"); }
    get dependencies() {
        return __classPrivateFieldGet(this, _Plugin_dependencies, "f").slice();
    }
    get defines() {
        return __classPrivateFieldGet(this, _Plugin_defines, "f").slice();
    }
    get provides() {
        return __classPrivateFieldGet(this, _Plugin_provides, "f").slice();
    }
}
_Plugin_loadUrl = new WeakMap(), _Plugin_name = new WeakMap(), _Plugin_url = new WeakMap(), _Plugin_dependencies = new WeakMap(), _Plugin_defines = new WeakMap(), _Plugin_provides = new WeakMap();
exports.default = Plugin;
//# sourceMappingURL=Plugin.js.map