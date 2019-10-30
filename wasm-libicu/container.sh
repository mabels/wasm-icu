. ./branch.sh

sh -x prepare.sh $BRANCH

docker rmi trzeci/emscripten
docker run --rm -v `pwd`:/src trzeci/emscripten \
  bash -c "(cd icu/icu4c/source && bash -x ../../../build.sh)"

#cd icu/icu4c/source && bash -x ../../../build.sh
