#CFLAGS="-s TOTAL_MEMORY=32MB" \
#CPPFLAGS="-s TOTAL_MEMORY=32MB" \
#CXXFLAGS="-s TOTAL_MEMORY=32MB -s WASM=1 -s FORCE_FILESYSTEM=1 -s NODERAWFS=1 -std=c++11" \
#emconfigure ./configure --enable-static --prefix=/src/dist
#sed -i.orig 's/^EXEEXT =/EXEEXT = .js/' icudefs.mk
max8nproc()
{
  a=$(nproc)
  b=8
  if [ "$a" -lt "$b" ]
  then
   echo $a
  else
   echo $b
  fi
}
if [ -d /src ]
then
  PREFIX=/src/dist
else
  PREFIX=$PWD/../dist
fi
mkdir -p $PREFIX
sh autogen.sh
emconfigure ./configure --prefix=$PWD/../dist --disable-shared --enable-static
emmake make clean
emmake make -j$(max8nproc) EXEEXT=.js
emmake make -j$(max8nproc) install
