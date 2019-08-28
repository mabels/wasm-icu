#CFLAGS="-s TOTAL_MEMORY=32MB" \
#CPPFLAGS="-s TOTAL_MEMORY=32MB" \
#CXXFLAGS="-s TOTAL_MEMORY=32MB -s WASM=1 -s FORCE_FILESYSTEM=1 -s NODERAWFS=1 -std=c++11" \
#emconfigure ./configure --enable-static --prefix=/src/dist
#sed -i.orig 's/^EXEEXT =/EXEEXT = .js/' icudefs.mk
./runConfigureICU wasm32 --prefix=/src/dist
make clean
make -j$(nproc)
make -j$(nproc) install
