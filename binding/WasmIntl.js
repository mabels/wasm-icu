
const WasmIcu = require('./WasmIcu.js');

let waitForReady = [];

let Module = undefined;

WasmIcu().then((module) => {
	Module = module;
	console.log('Ready');
	waitForReady.forEach(p => p(module));
	waitForReady = undefined;
});

module.exports = { 
	ready: function() {
		if (waitForReady) {
			return new Promise(rs => waitForReady.push(rs));
		}
		return Promise.resolve();
	},
	CurrencyFormatter: function(locale, currency) {
		if (Module) {
			return Promise.resolve(new Module.CurrencyFormatter(locale, currency));
		}
		return new Promise(rs => {
			console.log('Waiter');
			waitForReady.push((module) => {
			   console.log('Got ready');
			   rs(new module.CurrencyFormatter(locale, currency))
			});
		});
	}
}
