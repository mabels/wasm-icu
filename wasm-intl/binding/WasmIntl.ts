import { FormatterOptions } from '../generated/formatter-options_pb';
const WasmIntlBinding = require("../dist/WasmIntlBinding");


type WaitForReadyFn = () => void;

type StyleValues = "decimal" | "currency" | "percent" | "unit";
type LocaleValues = "lookup" | "best fit";
type UnitDisplayValues = 'long' | 'short' | 'narrow';
type CurrencyDisplayValues = 'symbol' | 'code' | 'name';
type ZeroTo20 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
                10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
type OneTo21 =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
                12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;
type NotationValues = "standard" | "scientific" | "engineering" | "compact";

/*
function styleDefault(val?: string, def = "decimal"): StyleValues {
  return (["decimal", "currency", "percent", "unit"].find(i => i === val) ||
    def) as StyleValues;
}


function localeMatcherDefault(val?: string, def = 'best fit'): LocaleValues {
  return (["lookup", "best fit"].find(i => i === val) ||
    def) as LocaleValues;
}


function unitDisplayDefault(val?: string, def = '') {
  return (['long' , 'short' , 'narrow'].find(i => i === val) ||
    def) as UnitDisplayValues;
}
function currencyDisplayDefault(val?: string, def = '') {
  return (['symbol', 'code', 'name'].find(i => i === val) ||
    def) as CurrencyDisplayValues;
}

function zeroTo20Default(val: number | undefined, def: number) {
  return (typeof val === 'number' && 0 <= val && val <= 20 ? val : def) as ZeroTo20;
}


function oneTo21Default(val: number | undefined, def: number): OneTo21 {
  return (typeof val === 'number' && 1 <= val && val <= 21 ? val : def) as OneTo21;
}
function notationDisplayDefault(val?: string, def = 'standard') {
  return (["standard", "scientific", "engineering", "compact"].find(i => i === val) ||
    def) as NotationValues;
}
*/

export interface NumberFormatProps {
  readonly style?: StyleValues;
  readonly currency?: string;
  readonly localeMatcher?: LocaleValues;
  readonly unitDisplay?: UnitDisplayValues;
  readonly currencyDisplay?: CurrencyDisplayValues;
  readonly useGrouping?: boolean;
  readonly minimumIntegerDigits?: OneTo21;
  readonly minimumFractionDigits?: ZeroTo20;
  readonly maximumFractionDigits?: ZeroTo20;
  readonly minimumSignificatDigits?: OneTo21;
  readonly maximumSignificatDigits?: OneTo21;
  readonly notation?: NotationValues;

/*
unitDisplay: "long"
unitDisplay: "short"
unitDisplay: "narrow"
currencyDisplay: "symbol"
currencyDisplay: "code"
currencyDisplay: "name"
useGrouping: boolean || true
minimumIntegerDigits: 1-21 || 1
minimumFractionDigits: 0-20 || 0
maximumFractionDigits: 0-20 || 0
minimumSignificantDigits: 1-21 || 1
maximumSignificantDigits: 1-21 || 21
notation: "standard"
notation: "scientific"
notation: "engineering"
notation: "compact"
*/
}

function currencyToString(currency?: string): string {
  return typeof currency == "string" ? currency : "-";
}

// interface NumberFormatCtxProps {
//   readonly currency?: string;
//   readonly style: StyleValues;
//   readonly localeMatcher: LocaleValues;
//   readonly unitDisplay: UnitDisplayValues;
//   readonly currencyDisplay: CurrencyDisplayValues;
//   readonly useGrouping: boolean;
//   readonly minimumIntegerDigits: OneTo21;
//   readonly minimumFractionDigits: ZeroTo20;
//   readonly maximumFractionDigits: ZeroTo20;
//   readonly minimumSignificatDigits: OneTo21;
//   readonly maximumSignificatDigits: OneTo21;
//   readonly notation: NotationValues;
// }

function toFormatterOptions(locale: string, props: NumberFormatProps) {
  const builder = new FormatterOptions();
  builder.setLocale(locale);
  if (props.style) {
    builder.setStyle(props.style)
  }
  if (props.currency) {
    builder.setCurrency(props.currency)
  }
  if (props.unitDisplay) {
    builder.setUnitdisplay(props.unitDisplay)
  }
  if (props.currencyDisplay) {
    builder.setCurrencydisplay(props.currencyDisplay)
  }
  if (props.useGrouping) {
    builder.setUsegrouping(!!props.useGrouping)
  }
  if (typeof props.minimumIntegerDigits === 'number') {
    builder.setMinimumintegerdigits(props.minimumIntegerDigits)
  }
  if (typeof props.minimumFractionDigits === 'number') {
    builder.setMinimumfractiondigits(props.minimumFractionDigits)
  }
  if (typeof props.maximumFractionDigits === 'number') {
    builder.setMaximumfractiondigits(props.maximumFractionDigits)
  }
  if (typeof props.minimumSignificatDigits === 'number') {
    builder.setMinimumsignificantdigits(props.minimumSignificatDigits)
  }
  if (typeof props.maximumSignificatDigits === 'number') {
    builder.setMaximumsignificantdigits(props.maximumSignificatDigits)
  }
  if (props.notation) {
    builder.setNotation(props.notation)
  }
  return builder.serializeBinary();
}


function arrayToWasm(ctx: WasmIntlCtx, typedArray: Uint8Array) {
  var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
  var ptr = ctx.wasmModule._malloc(numBytes);
  var heapBytes = new Uint8Array(ctx.wasmModule.HEAPU8.buffer, ptr, numBytes);
  heapBytes.set(new Uint8Array(typedArray.buffer));
  return heapBytes;
}

export class NumberFormatCtx {
  private readonly wasmFormatter: any;
  // private readonly wasmFormatterOptionBuilder: any;
  constructor(ctx: WasmIntlCtx, locale: string, props: NumberFormatProps) {
    const pb = toFormatterOptions(locale, props);
    // console.log('xxxxx', this.wasmFormatterOptionBuilder.build().getMaximumFractionDigits(),
    //                      this.wasmFormatterOptionBuilder.build().getMinimumFractionDigits());

    const heapBytes = arrayToWasm(ctx, pb);
    switch (props.style) {
      case "currency":
        this.wasmFormatter = new ctx.wasmModule.CurrencyFormatter(
          pb.length, heapBytes.byteOffset
        );
        break;
      case "decimal":
        throw Error("decimal is not implemented");
        this.wasmFormatter = new ctx.wasmModule.DecimalFormatter(
          pb.length, pb
        );
        break;
      case "percent":
        throw Error("percent is not implemented");
        this.wasmFormatter = new ctx.wasmModule.PercentFormatter(
          pb.length, pb
        );
        break;
      case "unit":
        throw Error("unit is not implemented");
        this.wasmFormatter = new ctx.wasmModule.UnitFormatter(
          pb.length, pb
        );
        break;
    }
    ctx.wasmModule._free(heapBytes.byteOffset);
  }
  public delete() {
    this.wasmFormatter.delete();
    // this.wasmFormatterOptionBuilder.delete();
  }
  public format(val: number): string {
    return this.wasmFormatter.format(val);
  }
}

export class WasmIntlCtx {
  public wasmModule: any;

  public NumberFormat(
    locale: string,
    props?: NumberFormatProps
  ): NumberFormatCtx {
    return new NumberFormatCtx(this, locale, props || {});
    /*
      {
      style: styleDefault(props && props.style),
      localeMatcher: localeMatcherDefault(props && props.localeMatcher),
      unitDisplay: unitDisplayDefault(props && props.unitDisplay),
      currencyDisplay: currencyDisplayDefault(props && props.currencyDisplay),
      useGrouping: props && typeof props.useGrouping === 'boolean' ? props.useGrouping : true,
      minimumIntegerDigits: oneTo21Default(props && props.minimumIntegerDigits, 1),
      minimumFractionDigits: zeroTo20Default(props && props.maximumFractionDigits, 0),
      maximumFractionDigits: zeroTo20Default(props && props.minimumFractionDigits, 0),
      minimumSignificatDigits: oneTo21Default(props && props.minimumSignificatDigits, 1),
      maximumSignificatDigits: oneTo21Default(props && props.maximumSignificatDigits, 21),
      notation: notationDisplayDefault(props && props.notation)
    });
    */
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
