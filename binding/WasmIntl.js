
const wasm = require('./CurrencyFormatter.js');

let waitForReady = [];

wasm.onRuntimeInitialized = (_) => {
	console.log('Wasm is ready');
	waitForReady.forEach(p => p());
	waitForReady = undefined;
	
};

module.exports = { 
	ready: function() {
		if (waitForReady) {
			return new Promise(rs => waitForReady.push(rs));
		}
		return Promise.resolve();
	},
	CurrencyFormatter: function(locale, currency) {
		return new wasm.CurrencyFormatter(locale, currency);
	}
}
