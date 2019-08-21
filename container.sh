. branch.sh

sh -x prepare.sh $BRANCH

docker run --rm -v `pwd`:/src trzeci/emscripten \
	bash -c "(cd icu-$BRANCH/icu4c/source && bash -x ../../../build.sh)"
