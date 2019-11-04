#CFLAGS="-s TOTAL_MEMORY=32MB" \
#CPPFLAGS="-s TOTAL_MEMORY=32MB" \
#CXXFLAGS="-s TOTAL_MEMORY=32MB -s WASM=1 -s FORCE_FILESYSTEM=1 -s NODERAWFS=1 -std=c++11" \
#emconfigure ./configure --enable-static --prefix=/src/dist
#sed -i.orig 's/^EXEEXT =/EXEEXT = .js/' icudefs.mk
if [ -d /src ]
  PREFIX=/src/dist
else
  PREFIX=$PWD/dist
fi
mkdir -p $PREFIX
sh autogen.sh
emconfigure ./configure --prefix=$PWD/../dist --disable-shared --enable-static
make clean
make -j$(nproc) EXEEXT=.js
make -j$(nproc) install
