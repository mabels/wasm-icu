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

PROTOC=$(PWD)/generated/protobuf/dist/bin/protoc
LIBPROTOC=$(PWD)/generated/protobuf/dist/lib/libprotobuf-lite.a

#ifeq (${EMSDK},)
#	DOCKER_EMSDK=docker run --rm -v `pwd`:/src trzeci/emscripten
#else
DOCKER_EMSDK=
#endif

EMCCOPTS= -s MODULARIZE=1 -s 'EXPORT_NAME="WasmIntlBinding"' \
		      -s TOTAL_MEMORY=40MB -s WASM=1 \
					-s NODEJS_CATCH_REJECTION=0

TARGET_DIR = ./dist

all: $(TARGET_DIR) generated $(PROTOC) $(TARGET_DIR)/WasmIntlBinding.js

native-protoc: $(LIBPROTOC)

$(LIBPROTOC): native-protobuf.sh ../wasm-protobuf/branch.sh ../wasm-protobuf/prepare.sh
	sh -x native-protobuf.sh

$(TARGET_DIR):
	mkdir -p $(TARGET_DIR)

generated:
	mkdir -p generated 

generated/formatter-options.pb.h: binding/formatter-options.proto
	cd binding && $(PROTOC) -I=./ --cpp_out=../generated formatter-options.proto

$(TARGET_DIR)/WasmIntlBinding.js: dist/main.o \
	dist/formatter-options.pb.o
	$(DOCKER_EMSDK) \
	emcc -O3 --bind -std=c++11 \
	  -DICUNS=icu_65 \
		$(EMCCOPTS) \
		-I ./generated \
		-I $(ICU_BASE)/include \
		-I $(PROTOBUF_BASE)/include \
		dist/formatter-options.pb.o \
		dist/main.o \
		-o $@ \
		-L $(ICU_BASE)/lib -licui18n -licuio -licutu -licuuc -licudata \
		-s EXPORTED_FUNCTIONS='["_main", "_icuVersion"]' \
		-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
		-L $(PROTOBUF_BASE)/lib -lprotobuf-lite 

dist/formatter-options.pb.o: generated/formatter-options.pb.h \
	generated/formatter-options.pb.cc
	$(DOCKER_EMSDK) \
	emcc -O3 -std=c++11 \
		-I $(PROTOBUF_BASE)/include \
		-c -o dist/formatter-options.pb.o \
		generated/formatter-options.pb.cc

dist/main.o: binding/main.cpp \
	binding/str2int.h \
	binding/currency-formatter.h \
	dist/formatter-options.pb.o
	$(DOCKER_EMSDK) \
	emcc -O3 -std=c++11 \
	  	-DICUNS=icu_65 \
		-s WASM=1 \
		-I ./generated \
		-I $(ICU_BASE)/include \
		-I $(PROTOBUF_BASE)/include \
		-c -o dist/main.o \
		binding/main.cpp

clean:
		rm -rf $(TARGET_DIR) generated
