#ifndef __FormatterOptions__
#define __FormatterOptions__

#include <string>

class FormatterOptions
{
public:
	std::string locale;
	std::string style;
	std::string unitDisplay;
	std::string currency;
	std::string currencyDisplay;
	std::string compactDisplay;
	std::string notation;
	bool useGrouping;
	bool hasMinimumIntegerDigits;
	int minimumIntegerDigits;
	bool hasMinimumFractionDigits;
	int minimumFractionDigits;
	bool hasMaximumFractionDigits;
	int maximumFractionDigits;
	bool hasMinimumSignificantDigits;
	int minimumSignificantDigits;
	bool hasMaximumSignificantDigits;
	int maximumSignificantDigits;
	FormatterOptions() : locale(""),
											style("currency"),
											unitDisplay(""),
											currency(""),
											currencyDisplay(""),
											useGrouping(true),
											minimumIntegerDigits(-1),
											hasMinimumIntegerDigits(false),
											minimumFractionDigits(-1),
											hasMinimumFractionDigits(false),
											maximumFractionDigits(-1),
											hasMaximumFractionDigits(false),
											minimumSignificantDigits(-1),
											hasMinimumSignificantDigits(false),
											maximumSignificantDigits(-1),
											hasMaximumSignificantDigits(false),
											compactDisplay(""),
											notation("")
	{
	}

  int getMinimumFractionDigits() const { return minimumFractionDigits; }
  int getMaximumFractionDigits() const { return maximumFractionDigits; }

};

class FormatterOptionBuilder
{
private:
	FormatterOptions options;

public:
	const FormatterOptions *build() const
	{
		return &(this->options);
	}
	void locale(const std::string &val)
	{
		this->options.locale = val;
	}
	void style(const std::string &val)
	{
		this->options.style = val;
	}
	void unitDisplay(const std::string &val)
	{
		this->options.unitDisplay = val;
	}
	void currency(const std::string &val)
	{
		this->options.currency = val;
	}
	void currencyDisplay(const std::string &val)
	{
		this->options.currencyDisplay = val;
	}
	void useGrouping(bool val)
	{
		this->options.useGrouping = val;
	}
	void minimumIntegerDigits(int val)
	{
		this->options.minimumIntegerDigits = val;
    this->options.hasMinimumIntegerDigits = true;
	}
	void minimumFractionDigits(int val)
	{
		this->options.minimumFractionDigits = val;
    this->options.hasMinimumFractionDigits = true;
	}
	void maximumFractionDigits(int val)
	{
		this->options.maximumFractionDigits = val;
    this->options.hasMaximumFractionDigits = true;
	}
	void minimumSignificantDigits(int val)
	{
		this->options.minimumSignificantDigits = val;
    this->options.hasMinimumSignificantDigits = true;
	}
	void maximumSignificantDigits(int val)
	{
		this->options.maximumSignificantDigits = val;
    this->options.hasMaximumSignificantDigits = true;
	}
	void compactDisplay(std::string val)
	{
		this->options.compactDisplay = val;
	}
	void notation(std::string val)
	{
		this->options.notation = val;
	}
};

#endif
