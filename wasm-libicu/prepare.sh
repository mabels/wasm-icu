#
. ./branch.sh

ICU_DIR=./icu

GIT_REPO=https://github.com/mabels/icu.git
#if [ -d $HOME/icu/.git ] 
#then
#	GIT_REPO=$HOME/icu/.git
#fi
if [ -d $ICU_DIR ]
then
	(cd $ICU_DIR && git fetch && git reset --hard && git clean -f -d && git checkout master && git branch -D $BRANCH)
else
	GIT_LFS_SKIP_SMUDGE=1 git clone $GIT_REPO $ICU_DIR
fi
(cd $ICU_DIR && git co -b $BRANCH $BRANCH)
(cd $ICU_DIR && git diff -p wasm-icu-start..remotes/origin/wasm-icu | patch -p1)

