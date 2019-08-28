. ./branch.sh

sh -x prepare.sh $BRANCH

if [ "$EMSDK" = "" ]
then
  docker run --rm -v `pwd`:/src trzeci/emscripten \
 	  bash -c "(cd icu/icu4c/source && bash -x ../../../build.sh)"
else
  (cd icu/icu4c/source && bash -x ../../../build.sh)
fi

