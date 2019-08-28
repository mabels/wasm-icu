ICU_BASE=./node_modules/wasm-libicu/dist

ifeq (${EMSDK},) 
	DOCKER_EMSDK=docker run --rm -v `pwd`:/src trzeci/emscripten
else
	DOCKER_EMSDK=
endif

all: ./dist ./dist/WasmIntlBinding.js

./dist:
	mkdir -p ./dist

./dist/WasmIntlBinding.js: binding/CurrencyFormatter.cpp
	$(DOCKER_EMSDK) \
	emcc -O3 --bind -std=c++11 \
		-s MODULARIZE=1 -s 'EXPORT_NAME="WasmIntlBinding"' \
		-s TOTAL_MEMORY=32MB -s WASM=1 -s FORCE_FILESYSTEM=1 -s NODERAWFS=1 \
		-I $(ICU_BASE)/include \
		$< \
		-o $@ \
		-L $(ICU_BASE)/lib -licui18n -licuio -licutu -licuuc -licudata \
		-s EXPORTED_FUNCTIONS='["_main", "_icuVersion"]' \
		-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'

clean:
		rm -rf dist
