"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WasmIcu = __importStar(require("./WasmIcu"));
var waitForReady = [];
var wasmModule = undefined;
WasmIcu().then(function (module) {
    wasmModule = module;
    waitForReady.forEach(function (p) { return p(module); });
    waitForReady.splice(0, waitForReady.length);
});
module.exports = {
    CurrencyFormatter: function (locale, currency) {
        if (wasmModule) {
            return Promise.resolve(new wasmModule.CurrencyFormatter(locale, currency));
        }
        return new Promise(function (rs) {
            waitForReady.push(function (wasmModule) {
                rs(new wasmModule.CurrencyFormatter(locale, currency));
            });
        });
    }
};
