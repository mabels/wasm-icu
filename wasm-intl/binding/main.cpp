
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

#include "unicode/uvernum.h"

#include "currency-formatter.h"

EMSCRIPTEN_BINDINGS(intl)
{
	class_<CurrencyFormatter>("CurrencyFormatter")
			.constructor<int, const char *>()
			.function("format", &CurrencyFormatter::format)
			.property("errorCode", &CurrencyFormatter::getErrorCode)
			.property("errorName", &CurrencyFormatter::getErrorName);

/*
	class_<FormatterOptionBuilder>("FormatterOptionBuilder")
		.constructor()
		// .function("build", &FormatterOptionBuilder::build)
		.function("locale", &FormatterOptionBuilder::locale)
		.function("style", &FormatterOptionBuilder::style)
		.function("unitDisplay", &FormatterOptionBuilder::unitDisplay)
		.function("currency", &FormatterOptionBuilder::currency)
		.function("currencyDisplay", &FormatterOptionBuilder::currencyDisplay)
		.function("useGrouping", &FormatterOptionBuilder::useGrouping)
		.function("minimumIntegerDigits", &FormatterOptionBuilder::minimumIntegerDigits)
		.function("minimumFractionDigits", &FormatterOptionBuilder::minimumFractionDigits)
		.function("maximumFractionDigits", &FormatterOptionBuilder::maximumFractionDigits)
		.function("minimumSignificantDigits", &FormatterOptionBuilder::minimumSignificantDigits)
		.function("maximumSignificantDigits", &FormatterOptionBuilder::maximumSignificantDigits)
		.function("compactDisplay", &FormatterOptionBuilder::compactDisplay)
		.function("notation", &FormatterOptionBuilder::notation);

	class_<FormatterOptions>("FormatterOptions")
		.constructor()
    .property("style", &FormatterOptions::style)
    .property("currency", &FormatterOptions::currency)
    .function("getMinimumFractionDigits", &FormatterOptions::getMinimumFractionDigits)
    .function("getMaximumFractionDigits", &FormatterOptions::getMaximumFractionDigits);
		*/
}

extern "C"
{
	const char *icuVersion()
	{
		return U_ICU_VERSION;
	}
}

int main()
{
	//	EM_ASM( icuReady() );
}
