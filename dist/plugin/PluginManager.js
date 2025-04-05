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
var _PluginManager_instances, _PluginManager_loader, _PluginManager_retryDelay, _PluginManager_retryInterval, _PluginManager_listeners, _PluginManager_plugins, _PluginManager_definitions, _PluginManager_providers, _PluginManager_logger, _PluginManager_loadPluginInternal, _PluginManager_checkPluginsInternal, _PluginManager_checkPluginDefinitions, _PluginManager_checkPluginProviders;
Object.defineProperty(exports, "__esModule", { value: true });
const js_utils_logger_1 = require("@uncover/js-utils-logger");
const Plugin_1 = __importDefault(require("./object/Plugin"));
const PluginProvider_1 = __importDefault(require("./object/PluginProvider"));
const js_utils_1 = require("@uncover/js-utils");
const PluginLoader_1 = __importDefault(require("./loader/PluginLoader"));
class PluginManager {
    constructor(loader, logConfig) {
        _PluginManager_instances.add(this);
        _PluginManager_loader.set(this, void 0);
        _PluginManager_retryDelay.set(this, -1);
        _PluginManager_retryInterval.set(this, void 0);
        _PluginManager_listeners.set(this, []);
        _PluginManager_plugins.set(this, {});
        _PluginManager_definitions.set(this, {});
        _PluginManager_providers.set(this, {});
        _PluginManager_logger.set(this, void 0);
        __classPrivateFieldSet(this, _PluginManager_loader, loader || new PluginLoader_1.default(), "f");
        __classPrivateFieldSet(this, _PluginManager_logger, new js_utils_logger_1.Logger('PluginManager', logConfig), "f");
    }
    get logger() {
        return __classPrivateFieldGet(this, _PluginManager_logger, "f");
    }
    get retryDelay() {
        return __classPrivateFieldGet(this, _PluginManager_retryDelay, "f");
    }
    set retryDelay(delay) {
        __classPrivateFieldSet(this, _PluginManager_retryDelay, delay, "f");
    }
    get data() {
        return {
            urls: this.urls,
            roots: this.roots,
            plugins: this.plugins,
            definitions: this.definitions,
            providers: this.providers
        };
    }
    get urls() {
        const loadedUrls = __classPrivateFieldGet(this, _PluginManager_loader, "f").urls.reduce((acc, url) => {
            acc[url] = {
                state: this.getState(url),
                errors: this.getErrors(url),
                data: this.getData(url)
            };
            return acc;
        }, {});
        return loadedUrls;
    }
    getData(url) {
        return __classPrivateFieldGet(this, _PluginManager_loader, "f").getData(url);
    }
    getState(url) {
        return __classPrivateFieldGet(this, _PluginManager_loader, "f").getState(url);
    }
    getErrors(url) {
        return __classPrivateFieldGet(this, _PluginManager_loader, "f").getErrors(url);
    }
    get roots() {
        const dependentEntries = [];
        Object.values(__classPrivateFieldGet(this, _PluginManager_plugins, "f")).forEach(plugin => {
            plugin.dependencies.forEach(dependency => {
                if (!dependentEntries.includes(dependency)) {
                    dependentEntries.push(dependency);
                }
            });
        });
        return Object.values(__classPrivateFieldGet(this, _PluginManager_plugins, "f")).reduce((acc, plugin) => {
            if (!dependentEntries.includes(plugin.loadUrl)) {
                acc[plugin.name] = plugin;
            }
            return acc;
        }, {});
    }
    get plugins() {
        return __classPrivateFieldGet(this, _PluginManager_plugins, "f");
    }
    getPlugin(pluginId) {
        return this.plugins[pluginId];
    }
    getPluginByUrl(pluginUrl) {
        const data = this.getData(pluginUrl);
        if (data) {
            return this.plugins[data.name];
        }
    }
    get definitions() {
        return __classPrivateFieldGet(this, _PluginManager_definitions, "f");
    }
    getDefinition(definitionId) {
        return this.definitions[definitionId];
    }
    get providers() {
        return __classPrivateFieldGet(this, _PluginManager_providers, "f");
    }
    getProviders(definitionId) {
        return Object.values(__classPrivateFieldGet(this, _PluginManager_providers, "f")).filter(provider => provider.definition === definitionId);
    }
    getProvider(providerId) {
        return __classPrivateFieldGet(this, _PluginManager_providers, "f")[providerId];
    }
    register(listener) {
        __classPrivateFieldGet(this, _PluginManager_listeners, "f").push(listener);
        return () => this.unregister(listener);
    }
    unregister(listener) {
        __classPrivateFieldSet(this, _PluginManager_listeners, js_utils_1.ArrayUtils.removeElement(__classPrivateFieldGet(this, _PluginManager_listeners, "f"), listener), "f");
    }
    notify() {
        __classPrivateFieldGet(this, _PluginManager_listeners, "f").forEach(listener => {
            listener(this.data);
        });
    }
    reset(notify = true) {
        __classPrivateFieldGet(this, _PluginManager_loader, "f").reset();
        __classPrivateFieldSet(this, _PluginManager_plugins, {}, "f");
        __classPrivateFieldSet(this, _PluginManager_definitions, {}, "f");
        __classPrivateFieldSet(this, _PluginManager_providers, {}, "f");
        if (notify) {
            this.notify();
        }
    }
    loadPlugin(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, notify = true) {
            __classPrivateFieldGet(this, _PluginManager_loader, "f").include(url);
            yield __classPrivateFieldGet(this, _PluginManager_instances, "m", _PluginManager_loadPluginInternal).call(this, url);
            if (notify) {
                this.notify();
            }
        });
    }
    unloadPlugin(url) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _PluginManager_loader, "f").exclude(url);
            this.reloadPlugins();
        });
    }
    reloadPlugins() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootUrls = Object.values(this.roots).map(root => root.loadUrl);
            this.reset(false);
            yield Promise.all(rootUrls.map(rootUrl => __classPrivateFieldGet(this, _PluginManager_instances, "m", _PluginManager_loadPluginInternal).call(this, rootUrl)));
            this.notify();
        });
    }
}
_PluginManager_loader = new WeakMap(), _PluginManager_retryDelay = new WeakMap(), _PluginManager_retryInterval = new WeakMap(), _PluginManager_listeners = new WeakMap(), _PluginManager_plugins = new WeakMap(), _PluginManager_definitions = new WeakMap(), _PluginManager_providers = new WeakMap(), _PluginManager_logger = new WeakMap(), _PluginManager_instances = new WeakSet(), _PluginManager_loadPluginInternal = function _PluginManager_loadPluginInternal(url, parent) {
    return __awaiter(this, void 0, void 0, function* () {
        clearInterval(__classPrivateFieldGet(this, _PluginManager_retryInterval, "f"));
        if (__classPrivateFieldGet(this, _PluginManager_loader, "f").hasData(url)) {
            this.logger.warn(`URL already loaded: '${url}'`);
            return true;
        }
        const loadValid = yield __classPrivateFieldGet(this, _PluginManager_loader, "f").load(url);
        if (!loadValid) {
            this.logger.warn(`Failed to load plugin from: '${url}'`);
            this.logger.warn(__classPrivateFieldGet(this, _PluginManager_loader, "f").getErrors(url).join('\n'));
            return false;
        }
        const data = __classPrivateFieldGet(this, _PluginManager_loader, "f").getData(url);
        if (__classPrivateFieldGet(this, _PluginManager_plugins, "f")[data.name]) {
            const previousUrl = __classPrivateFieldGet(this, _PluginManager_plugins, "f")[data.name].loadUrl;
            this.logger.warn(`Plugin '${data.name}' from '${data.url}' already registered from '${previousUrl}'`);
            return false;
        }
        const plugin = new Plugin_1.default(url, data);
        __classPrivateFieldGet(this, _PluginManager_plugins, "f")[data.name] = plugin;
        yield Promise.allSettled((data.dependencies || []).map((dependency) => {
            return __classPrivateFieldGet(this, _PluginManager_instances, "m", _PluginManager_loadPluginInternal).call(this, dependency, data.name);
        }));
        try {
            __classPrivateFieldGet(this, _PluginManager_instances, "m", _PluginManager_checkPluginsInternal).call(this);
        }
        catch (error) {
            this.logger.error(String(error));
        }
        if (__classPrivateFieldGet(this, _PluginManager_retryDelay, "f") > 0) {
            __classPrivateFieldSet(this, _PluginManager_retryInterval, setInterval(() => {
                this.reloadPlugins();
            }, __classPrivateFieldGet(this, _PluginManager_retryDelay, "f")), "f");
        }
        this.logger.warn(`Succesully loaded plugin from '${url}'`);
        return true;
    });
}, _PluginManager_checkPluginsInternal = function _PluginManager_checkPluginsInternal() {
    __classPrivateFieldSet(this, _PluginManager_definitions, {}, "f");
    __classPrivateFieldSet(this, _PluginManager_providers, {}, "f");
    Object.values(this.roots).forEach((plugin) => __classPrivateFieldGet(this, _PluginManager_instances, "m", _PluginManager_checkPluginDefinitions).call(this, plugin));
    Object.values(this.roots).forEach((plugin) => __classPrivateFieldGet(this, _PluginManager_instances, "m", _PluginManager_checkPluginProviders).call(this, plugin));
}, _PluginManager_checkPluginDefinitions = function _PluginManager_checkPluginDefinitions(plugin) {
    plugin.defines.forEach(define => {
        if (this.getDefinition(define.name)) {
            this.logger.warn(`Defines '${define.name}' from '${plugin.name}' is already registered from ${this.getDefinition(define.name).plugin}`);
        }
        else {
            __classPrivateFieldGet(this, _PluginManager_definitions, "f")[define.name] = define;
        }
    });
    plugin.dependencies.forEach(dependency => {
        if (__classPrivateFieldGet(this, _PluginManager_loader, "f").isLoaded(dependency)) {
            const data = __classPrivateFieldGet(this, _PluginManager_loader, "f").getData(dependency);
            const object = this.getPlugin(data.name);
            __classPrivateFieldGet(this, _PluginManager_instances, "m", _PluginManager_checkPluginDefinitions).call(this, object);
        }
    });
}, _PluginManager_checkPluginProviders = function _PluginManager_checkPluginProviders(plugin) {
    plugin.provides.forEach(provide => {
        const definition = this.getDefinition(provide.define);
        if (!definition) {
            this.logger.warn(`Provides '${provide.name}' from '${plugin.name}' has no definition '${provide.define}'`);
        }
        else {
            const provider = new PluginProvider_1.default(plugin.url, definition, provide);
            __classPrivateFieldGet(this, _PluginManager_providers, "f")[provider.name] = provider;
        }
    });
    plugin.dependencies.forEach(dependency => {
        if (__classPrivateFieldGet(this, _PluginManager_loader, "f").isLoaded(dependency)) {
            const data = __classPrivateFieldGet(this, _PluginManager_loader, "f").getData(dependency);
            const object = this.getPlugin(data.name);
            __classPrivateFieldGet(this, _PluginManager_instances, "m", _PluginManager_checkPluginProviders).call(this, object);
        }
    });
};
exports.default = PluginManager;
//# sourceMappingURL=PluginManager.js.map