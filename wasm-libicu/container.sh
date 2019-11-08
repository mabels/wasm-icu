. ./branch.sh

sh -x prepare.sh $BRANCH

buildCmd="TOPLEVEL=`pwd` ; cd icu/icu4c/source && bash -x ../../../build.sh \$TOPLEVEL"

if `which emcc`
then
  docker rmi trzeci/emscripten
  docker run --rm -v `pwd`:/src trzeci/emscripten \
    bash -c "$buildCmd"
else
    bash -c "$buildCmd"
fi
