#ifndef __str2int__
#define __str2int__

constexpr unsigned int str2int(const char* str, int h = 0)
{
    return !str[h] ? 5381 : (str2int(str, h+1) * 33) ^ str[h];
}
unsigned int str2int(const std::string str, int h = 0)
{
	return str2int(str.c_str(), h);
}

#endif