ifneq ($(wildcard ../wasm-libicu/dist),)
	ICU_BASE=../wasm-libicu/dist
else
	ICU_BASE=./node_modules/wasm-libicu/dist
endif

ifneq ($(wildcard ../wasm-protobuf/dist),)
	PROTOBUF_BASE=../wasm-protobuf/dist
else
	PROTOBUF_BASE=./node_modules/wasm-protobuf/dist
endif

PROTOC=/Users/menabe/Software/protobuf/src/protoc


#ifeq (${EMSDK},)
#	DOCKER_EMSDK=docker run --rm -v `pwd`:/src trzeci/emscripten
#else
DOCKER_EMSDK=
#endif

TARGET_DIR = ./dist

all: $(TARGET_DIR) generated $(TARGET_DIR)/WasmIntlBinding.js

$(TARGET_DIR):
	mkdir -p $(TARGET_DIR)

generated:
	mkdir -p generated 

generated/formatter-options.pb.h: binding/formatter-options.proto
	cd binding && $(PROTOC) -I=./ --cpp_out=../generated formatter-options.proto

$(TARGET_DIR)/WasmIntlBinding.js: binding/main.cpp \
	binding/currency-formatter.h \
	binding/str2int.h generated/formatter-options.pb.o
	$(DOCKER_EMSDK) \
	emcc -O3 --bind -std=c++11 \
	  -DICUNS=icu_65 \
		-s MODULARIZE=1 -s 'EXPORT_NAME="WasmIntlBinding"' \
		-s TOTAL_MEMORY=32MB -s WASM=1 \
		-I ./generated \
		-I $(ICU_BASE)/include \
		-I $(PROTOBUF_BASE)/include \
		$< \
		-o $@ \
		-L $(ICU_BASE)/lib -licui18n -licuio -licutu -licuuc -licudata \
		-L $(PROTOBUF_BASE)/lib -lprotobuf-lite \
		-s EXPORTED_FUNCTIONS='["_main", "_icuVersion"]' \
		-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'

generated/formatter-options.pb.o: generated/formatter-options.pb.h \
	generated/formatter-options.pb.cc
	$(DOCKER_EMSDK) \
	emcc -O3 --bind -std=c++11 \
		-s WASM=1 \
		-I $(ICU_BASE)/include \
		-I $(PROTOBUF_BASE)/include \
		-c -o generated/formatter-options.pb.o \
		generated/formatter-options.pb.cc


clean:
		rm -rf $(TARGET_DIR) generated
