BASE=../icu/icu4c

all: CurrencyFormatter.js
	node TestWasmIntl

CurrencyFormatter.js: CurrencyFormatter.cpp
	emcc --bind -std=c++11 \
		-s TOTAL_MEMORY=32MB -s WASM=1 -s FORCE_FILESYSTEM=1 -s NODERAWFS=1 \
		-I $(BASE)/source/common -I $(BASE)/source/i18n -I $(BASE)/source/io \
		$< \
		-o $@ \
		-L$(BASE)/source/lib -licui18n -licuio \ -licutu -licudata -licuuc \
		-s EXPORTED_FUNCTIONS='["_main", "_icuVersion"]' \
		-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
