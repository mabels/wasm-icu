import { performance } from "perf_hooks";

import { WasmIntl, NumberFormatProps } from "./WasmIntl";

function currencyProps(c?: string): NumberFormatProps {
  return { style: "currency", currency: c };
}

test("optional currency", async () => {
  expect(
    (await WasmIntl()).NumberFormat("de_DE", currencyProps()).format(4711.22)
  ).toBe("4.711,22 €");
});

test("optional unknown-formated-currency", async () => {
  expect(
    (await WasmIntl()).NumberFormat("de_DE", currencyProps("-")).format(4711.22)
  ).toBe("4.711,22 €");
});

test("optional unknown currency", async () => {
  expect(
    (await WasmIntl())
      .NumberFormat("de_DE", currencyProps("NAN"))
      .format(4711.22)
  ).toBe("4.711,22 NAN");
});

test("optional EUR currency", async () => {
  expect(
    (await WasmIntl())
      .NumberFormat("de_DE", currencyProps("EUR"))
      .format(4711.22)
  ).toBe("4.711,22 €");
});

test("optional USD currency", async () => {
  expect(
    (await WasmIntl())
      .NumberFormat("de_DE", currencyProps("USD"))
      .format(4711.22)
  ).toBe("4.711,22 $");
});

test.skip("if we are a memory pig on format", async () => {
  const instance = (await WasmIntl()).NumberFormat(
    "de_DE",
    currencyProps("EUR")
  );
  for (let i = 0; i < 10000000; ++i) {
    const val = instance.format(i);
    if (0 == i % 1000000) {
      console.log(val);
    }
  }
  instance.delete();
});

test("full turn intl vs wasm-intl", async () => {
  const intlStart = performance.now();
  for (let i = 0; i < 10000; ++i) {
    Intl.NumberFormat("de-DE", currencyProps("EUR")).format(i);
  }
  const intlStop = performance.now();
  const cfStart = intlStop;
  for (let i = 0; i < 10000; ++i) {
    const cf = (await WasmIntl()).NumberFormat("de_DE", currencyProps("EUR"));
    cf.format(i);
    cf.delete();
  }
  const cfStop = performance.now();
  expect(((intlStop - intlStart) / (cfStop - cfStart)) * 100).toBeGreaterThan(
    60
  );
});

test("reuse intl vs wasm-intl", async () => {
  const intlNf = Intl.NumberFormat("de-DE", currencyProps("EUR"));
  const intlStart = performance.now();
  const out = [];
  for (let i = 0; i < 100000; ++i) {
    out.push(intlNf.format(i));
  }
  const intlStop = performance.now();
  out.splice(0, out.length);
  const cf = (await WasmIntl()).NumberFormat("de_DE", currencyProps("EUR"));
  const cfStart = intlStop;
  for (let i = 0; i < 100000; ++i) {
    out.push(cf.format(i));
  }
  const cfStop = performance.now();
  cf.delete();
  out.splice(0, out.length);
  const intlTime = intlStop - intlStart;
  const cfTime = cfStop - cfStart;
  // console.log(intlTime, cfTime);
  expect(((intlStop - intlStart) / (cfStop - cfStart)) * 100).toBeGreaterThan(
    1
  );
});

test.skip("are we a memory pig on CurrencyFormatter", async () => {
  for (let i = 0; i < 1000000; ++i) {
    const instance = (await WasmIntl()).NumberFormat(
      "de_DE",
      currencyProps("EUR")
    );
    const val = instance.format(i);
    if (0 == i % 1000000) {
      console.log(val);
    }
    instance.delete();
  }
});
