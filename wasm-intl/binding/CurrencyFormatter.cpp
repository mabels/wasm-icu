#include <emscripten/emscripten.h>
#include <emscripten/bind.h>


using namespace emscripten;

#include <stdio.h>
#include <string>
#include <sstream>
#include <iostream>

#include "unicode/uvernum.h"
#include "unicode/unistr.h"

#include "unicode/numberformatter.h"

class CurrencyFormatter {
	private:
		UErrorCode errorCode = U_ZERO_ERROR;
		icu_64::NumberFormat *nf;
	public:
		CurrencyFormatter(const std::string _locale, const std::string _currency): 
			nf(icu_64::NumberFormat::createCurrencyInstance(_locale.c_str(), errorCode)) 
		{
			if(U_FAILURE(errorCode)) {
			    printf("NumberFormat::createCurrencyInstance(%s) failed - %s\n",
				    _locale.c_str(), u_errorName(errorCode));
			    return;
			}
			UChar uCurrency[4];
			u_charsToUChars(_currency.c_str(), uCurrency, 4);
			nf->setCurrency(uCurrency, errorCode);
			if(U_FAILURE(errorCode)) {
				printf("setNumberFormatCurrency(%s) failed - %s\n",
					_currency.c_str(), u_errorName(errorCode));
			}
		}
		~CurrencyFormatter() {
			std::cout << "~CurrencyFormatter" << std::endl;
			if (nf) {
				delete nf;
			}
		}

		int getErrorCode() const { return errorCode; }
		std::string getErrorName() const { return u_errorName(errorCode); }
	
		std::string format(double value) const {
			icu_64::UnicodeString output;
			nf->format(value, output);
			//  uprintf(output);
			std::string str;
			output.toUTF8String(str);
			return str;
		}
};

EMSCRIPTEN_BINDINGS(intl) {
  class_<CurrencyFormatter>("CurrencyFormatter")
    .constructor<std::string, std::string>()
    .function("format", &CurrencyFormatter::format)
    .property("errorCode", &CurrencyFormatter::getErrorCode)
    .property("errorName", &CurrencyFormatter::getErrorName)
  ;
}

extern "C" {
	using namespace icu_64;
	const char *icuVersion() {
	  return U_ICU_VERSION;
	}
}

int main() {
//	EM_ASM( icuReady() );
}
