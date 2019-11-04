#
#. ./branch.sh

PROTOBUF_DIR=./protobuf

GIT_REPO=https://github.com/protocolbuffers/protobuf.git
if [ -d $PROTOBUF_DIR ]
then
	(cd $PROTOBUF_DIR && git fetch && git clean -f -d && git reset --hard && git clean -f -d && git checkout master && git branch -D $BRANCH)
else
	git clone $GIT_REPO $PROTOBUF_DIR
fi
(cd $PROTOBUF_DIR && git checkout -b $BRANCH $BRANCH)
# (cd $PROTOBUF_DIR && git diff -p wasm32-start..remotes/origin/wasm32 | patch -p1)

