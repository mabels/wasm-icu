const WasmIntlBinding = require("../dist/WasmIntlBinding");

type WaitForReadyFn = () => void;

export interface NumberFormatProps {
  readonly style: "currency";
  readonly currency?: string;
}

function currencyToString(currency?: string): string {
  return typeof currency == "string" ? currency : "-";
}

export class NumberFormatCtx {
  private readonly wasmFormatter: any;
  constructor(ctx: WasmIntlCtx, locale: string, currency?: string) {
    this.wasmFormatter = new ctx.wasmModule.CurrencyFormatter(
      locale,
      currencyToString(currency)
    );
  }
  public delete() {
    this.wasmFormatter.delete();
  }
  public format(val: number): string {
    return this.wasmFormatter.format(val);
  }
}

export class WasmIntlCtx {
  public wasmModule: any;
  public NumberFormat(
    locale: string,
    props: NumberFormatProps
  ): NumberFormatCtx {
    if (props && props.style === "currency") {
      return new NumberFormatCtx(this, locale, props.currency);
    }
    throw Error(
      `NumberFormat for style[${(props || {}).style}] not implemented`
    );
  }
  public get isReady() {
    return !!this.wasmModule;
  }
}

const waitForReady: WaitForReadyFn[] = [];
const wasmIntlCtx = new WasmIntlCtx();

WasmIntlBinding().then((module: any) => {
  wasmIntlCtx.wasmModule = module;
  waitForReady.forEach(p => p());
  waitForReady.splice(0, waitForReady.length);
});

export function WasmIntl(): Promise<WasmIntlCtx> {
  if (wasmIntlCtx.isReady) {
    return Promise.resolve(wasmIntlCtx);
  }
  return new Promise(rs => waitForReady.push(() => rs(wasmIntlCtx)));
}
