const WasmIntlBinding = require('../dist/WasmIntlBinding');


declare type WaitForReadyFn = (m: any) => void; 

const waitForReady: WaitForReadyFn[] = [];
let wasmModule: any = undefined;

WasmIntlBinding().then((module: any) => {
	wasmModule = module;
	waitForReady.forEach(p => p(module));
	waitForReady.splice(0, waitForReady.length)
});

declare class WasmCurrencyFormatter {
	constructor(locale: string, currency: string);
	public format(v:number): string;
	public delete(): void;
}

export function CurrencyFormatter(locale: string, currency: string): Promise<WasmCurrencyFormatter> {
		if (wasmModule) {
			return Promise.resolve(new wasmModule.CurrencyFormatter(locale, currency));
		}
		return new Promise(rs => {
			waitForReady.push((wasmModule: any) => {
			   rs(new wasmModule.CurrencyFormatter(locale, currency))
			});
		});
}
