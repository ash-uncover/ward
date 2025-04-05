"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PluginLoader_instances, _PluginLoader_urls, _PluginLoader_excludedUrls, _PluginLoader_fetch, _PluginLoader_read;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginLoadStates = void 0;
const JsonValidator_1 = require("./JsonValidator");
exports.PluginLoadStates = {
    NONE: 'NONE',
    EXCLUDED: 'EXCLUDED',
    LOAD_ERROR: 'LOAD_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    LOADED: 'LOADED'
};
class PluginLoader {
    constructor() {
        _PluginLoader_instances.add(this);
        _PluginLoader_urls.set(this, {});
        _PluginLoader_excludedUrls.set(this, []);
    }
    get urls() {
        return Object.keys(__classPrivateFieldGet(this, _PluginLoader_urls, "f"));
    }
    get excludedUrls() {
        return __classPrivateFieldGet(this, _PluginLoader_excludedUrls, "f").slice();
    }
    reset(resetExcluded = false) {
        __classPrivateFieldSet(this, _PluginLoader_urls, {}, "f");
        if (resetExcluded) {
            __classPrivateFieldSet(this, _PluginLoader_excludedUrls, [], "f");
        }
    }
    hasData(url) {
        var _a;
        return !!((_a = __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url]) === null || _a === void 0 ? void 0 : _a.data);
    }
    isLoaded(url) {
        var _a;
        return ((_a = __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url]) === null || _a === void 0 ? void 0 : _a.state) === exports.PluginLoadStates.LOADED;
    }
    getData(url) {
        var _a;
        return (_a = __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url]) === null || _a === void 0 ? void 0 : _a.data;
    }
    getErrors(url) {
        var _a;
        return ((_a = __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url]) === null || _a === void 0 ? void 0 : _a.errors) || [];
    }
    getState(url) {
        var _a;
        return ((_a = __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url]) === null || _a === void 0 ? void 0 : _a.state) || exports.PluginLoadStates.NONE;
    }
    exclude(url) {
        if (!__classPrivateFieldGet(this, _PluginLoader_excludedUrls, "f").includes(url)) {
            __classPrivateFieldGet(this, _PluginLoader_excludedUrls, "f").push(url);
        }
    }
    include(url) {
        const index = __classPrivateFieldGet(this, _PluginLoader_excludedUrls, "f").indexOf(url);
        if (index > -1) {
            __classPrivateFieldGet(this, _PluginLoader_excludedUrls, "f").splice(index, 1);
        }
    }
    load(url) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url] = {
                url,
                state: exports.PluginLoadStates.NONE,
                errors: [],
                loadDate: (new Date()).getTime()
            };
            if (__classPrivateFieldGet(this, _PluginLoader_excludedUrls, "f").includes(url)) {
                __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].state = exports.PluginLoadStates.EXCLUDED;
                return false;
            }
            let response;
            try {
                response = yield __classPrivateFieldGet(this, _PluginLoader_instances, "m", _PluginLoader_fetch).call(this, url);
            }
            catch (error) {
                __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].state = exports.PluginLoadStates.LOAD_ERROR;
                __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].errors.push(String(error));
                return false;
            }
            let data;
            try {
                data = yield __classPrivateFieldGet(this, _PluginLoader_instances, "m", _PluginLoader_read).call(this, response);
                __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].data = data;
            }
            catch (error) {
                __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].state = exports.PluginLoadStates.LOAD_ERROR;
                __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].errors.push(String(error));
                return false;
            }
            const validator = (0, JsonValidator_1.getValidator)();
            const valid = validator(data);
            if (!valid) {
                __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].state = exports.PluginLoadStates.VALIDATION_ERROR;
                if (validator.errors) {
                    __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].errors.push(...validator.errors.map(error => JSON.stringify(error, null, 2)));
                }
                return false;
            }
            __classPrivateFieldGet(this, _PluginLoader_urls, "f")[url].state = exports.PluginLoadStates.LOADED;
            return true;
        });
    }
}
_PluginLoader_urls = new WeakMap(), _PluginLoader_excludedUrls = new WeakMap(), _PluginLoader_instances = new WeakSet(), _PluginLoader_fetch = function _PluginLoader_fetch(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'GET',
            headers: new Headers()
        });
        return response;
    });
}, _PluginLoader_read = function _PluginLoader_read(response) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield response.json();
        return data;
    });
};
exports.default = PluginLoader;
//# sourceMappingURL=PluginLoader.js.map