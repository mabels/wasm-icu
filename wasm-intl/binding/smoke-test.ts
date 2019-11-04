import { WasmIntl, NumberFormatProps } from './WasmIntl';

function currencyProps(c?: string): NumberFormatProps {
  return { style: "currency", currency: c };
}

(async () => {
   console.log("Should be: ", (await WasmIntl()).NumberFormat("de-DE", currencyProps()).format(4711.22));
})();
