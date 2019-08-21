
const { ready, CurrencyFormatter } = require('./WasmIntl');

(async () => {
	await ready();
	console.log('Wasm Done');
	console.log(CurrencyFormatter('de_DE', 'EUR').format(4711.22));
	const instance = CurrencyFormatter('de_DE', 'EUR');
	for (let i = 0; i < 10000000; ++i) {
		val = instance.format(i);
		if (0 == i % 1000000) {
			console.log(val);
		}
	}
	instance.delete();
})();

