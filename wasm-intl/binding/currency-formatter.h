#ifndef __CurrencyFormatter__
#define __CurrencyFormatter__

#include <stdio.h>
#include <string>

#include "unicode/uvernum.h"
#include "unicode/unistr.h"
#include "unicode/numberformatter.h"

#include "formatter-options.h"
#include "str2int.h"



#ifndef SWITCHOFF
		/*
		switch (str2int(options.style))
		{
			case str2int("decimal"):
				nf = icu_64::NumberFormat::createInstance(locale, errorCode);
				break;
			case str2int("percent"):
				nf = icu_64::NumberFormat::createPercentInstance(locale, errorCode);
				break;
			case str2int("unit"):
				errorCode = U_ILLEGAL_ARGUMENT_ERROR;
				fprintf(stderr, "unit is not implemented failed\n");
				return;
				nf = icu_64::UnitFormat::createUnitInstance(locale, errorCode);
			  switch (str2int(options.unitDisplay)) {
				case str2int("short"):
					nf->unitWidth(UNumberUnitWidth::UNUM_UNIT_WIDTH_SHORT);
					break;
				case str2int("long"):
					nf->unitWidth(UNumberUnitWidth::UNUM_UNIT_WIDTH_FULL_NAME);
					break;
				case str2int("narrow"):
					nf->unitWidth(UNumberUnitWidth::UNUM_UNIT_WIDTH_NARROW);
					break;
				}
				break;
			case str2int("currency"):
			default:
		*/
		/*
				break;
		}
		*/
		/*
	  switch (str2int(options.currencyDisplay)) {
		case str2int("symbol"):
			nf->unitWidth(UNumberUnitWidth::UNUM_UNIT_WIDTH_SHORT);
			break;
    case str2int("code"):
			nf->unitWidth(UNumberUnitWidth::UNUM_UNIT_WIDTH_ISO_CODE);
			break;
    case str2int("name"):
			nf->unitWidth(UNumberUnitWidth::UNUM_UNIT_WIDTH_FULL_NAME);
			break;
    case str2int("narrow"):
			nf->unitWidth(UNumberUnitWidth::UNUM_UNIT_WIDTH_NARROW);
			break;
		}
		*/
		// nf->setMinimumSignificantDigits(options.minimumSignificantDigits);
		// nf->setMaximumSignificantDigits(options.maximumSignificantDigits);
		/*
		switch (str2int(options.notation.c_str())) {
			case str2int("standard"):
      	nf->notation(icu::number::Notation::simple());
				break;
			case str2int("scientific"):
					nf->notation(icu::number::Notation::scientific());
					break;
			case str2int("engineering"):
					nf->notation(icu::number::Notation::engineering());
					break;
			// 29. If notation is "compact", then
			case str2int("compact"):
				switch (str2int(options.compactDisplay)) {
					case str2int("short"):
						nf->notation(icu::number::Notation::compactShort());
						break;
					case str2int("long"):
					default:
						nf->notation(icu::number::Notation::compactLong());
				}
				break;
			}
			*/
#endif

class CurrencyFormatter
{
private:
	UErrorCode errorCode = U_ZERO_ERROR;
	icu_64::NumberFormat *nf = 0;

	void start()
	{
		const char *locale = this->builder.locale.c_str();
		nf = icu_64::NumberFormat::createCurrencyInstance(locale, errorCode);
		if (U_FAILURE(errorCode))
		{
			printf("%s::createCurrencyInstance(%s) failed - %s\n",
						 this->builder.style.c_str(), locale, u_errorName(errorCode));
			return;
		}

		if (this->builder.currency.length() >= 3)
		{
			UChar uCurrency[4];
			u_charsToUChars(this->builder.currency.c_str(), uCurrency, 4);
			nf->setCurrency(uCurrency, errorCode);
			if (U_FAILURE(errorCode))
			{
				printf("setNumberFormatCurrency(%s) failed - %s\n",
							 this->builder.currency.c_str(), u_errorName(errorCode));
			}
		}
		nf->setGroupingUsed(this->builder.useGrouping);
		if (this->builder.hasMinimumIntegerDigits) {
			nf->setMinimumIntegerDigits(this->builder.minimumIntegerDigits);
		}
		if (this->builder.hasMinimumFractionDigits) {
			nf->setMinimumFractionDigits(this->builder.minimumFractionDigits);
		}
		if (this->builder.hasMaximumFractionDigits) {
			nf->setMaximumFractionDigits(this->builder.maximumFractionDigits);
		}
	}

public:
	FormatterOptionBuilder builder;

	~CurrencyFormatter()
	{
		if (nf)
		{
			delete nf;
		}
	}

	int getErrorCode() const { return errorCode; }
	std::string getErrorName() const { return u_errorName(errorCode); }

	std::string format(double value) const
	{
		if (!nf) {
			this->start();
		}
		icu_64::UnicodeString output;
		nf->format(value, output);
		//  uprintf(output);
		std::string str;
		output.toUTF8String(str);
		return str;
	}
};

#endif



