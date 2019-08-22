
import { createCurrencyFormatter } from './WasmIntl';

(async () => {
	console.log((await createCurrencyFormatter('de_DE', 'EUR')).format(4711.22));
	const instance = await createCurrencyFormatter('de_DE', 'EUR');
	for (let i = 0; i < 10000000; ++i) {
		const val = instance.format(i);
		if (0 == i % 1000000) {
			console.log(val);
		}
	}
	instance.delete();
})();

