. ../wasm-protobuf/branch.sh

mkdir -p generated
cd generated

sh -x ../../wasm-protobuf/prepare.sh $BRANCH

cd protobuf
PREFIX=$PWD/dist
mkdir -p $PREFIX
sh autogen.sh
./configure --prefix=$PREFIX 
make clean
make -j$(nproc)
make -j$(nproc) install
