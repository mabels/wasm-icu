const WasmIntlBinding = require('../dist/WasmIntlBinding');


type WaitForReadyFn = (m: any) => void; 

const waitForReady: WaitForReadyFn[] = [];
let wasmModule: any = undefined;

WasmIntlBinding().then((module: any) => {
	wasmModule = module;
	waitForReady.forEach(p => p(module));
	waitForReady.splice(0, waitForReady.length)
});

export interface WasmCurrencyFormatter {
	new (locale: string, currency: string): WasmCurrencyFormatter;
	format(v: number): string;
	delete(): void;
}

export function createCurrencyFormatter(locale: string, currency: string): Promise<WasmCurrencyFormatter> {
		if (wasmModule) {
			return Promise.resolve(new wasmModule.CurrencyFormatter(locale, currency));
		}
		return new Promise(rs => {
			waitForReady.push((wasmModule: any) => {
			   rs(new wasmModule.CurrencyFormatter(locale, currency))
			});
		});
}
