. ./branch.sh

sh -x prepare.sh $BRANCH

buildCmd="cd protobuf && bash -x ../build.sh"

if `which emcc`
then
  docker rmi trzeci/emscripten
  docker run --rm -v `pwd`:/src trzeci/emscripten \
    bash -c "$buildCmd"
else
    bash -c "$buildCmd"
fi
