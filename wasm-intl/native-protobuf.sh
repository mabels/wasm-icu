. ../wasm-protobuf/branch.sh

mkdir -p generated
cd generated

sh -x ../../wasm-protobuf/prepare.sh $BRANCH

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

cd protobuf
PREFIX=$PWD/dist
mkdir -p $PREFIX
sh autogen.sh
./configure --prefix=$PREFIX 
make clean
make -j$(max8nproc)
make -j$(max8nproc) install
