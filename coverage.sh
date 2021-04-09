#!/bin/sh
pwd=$(pwd)
command="yarn istanbul-merge --out ${pwd}/coverage/coverage.json"
for fileName in $(find $pwd/coverage/ -name "coverage-final.json"); do
  command="${command} ${fileName}"
done
$command
command="yarn istanbul report --include ${pwd}/coverage/coverage.json --dir ${pwd}/coverage/ html"
$command
