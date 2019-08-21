#
. ./branch.sh

ICU_DIR=./icu

rm -rf $ICU_DIR
GIT_REPO=https://github.com/mabels/icu.git
#if [ -d $HOME/icu/.git ] 
#then
#	GIT_REPO=$HOME/icu/.git
#fi
GIT_LFS_SKIP_SMUDGE=1 git clone $GIT_REPO $ICU_DIR
(cd $ICU_DIR && git co -b release-64-2 release-64-2)
(cd $ICU_DIR && git diff -p wasm-icu-start..remotes/origin/wasm-icu | patch -p1)

