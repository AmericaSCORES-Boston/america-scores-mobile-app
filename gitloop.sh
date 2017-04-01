#!/bin/bash
eval "git remote add origin-remote $1"
for branch in $(git branch -r); do
  cleaned=${branch//origin\//}
  eval "git checkout $cleaned"
  eval "git push --set-upstream origin-remote $cleaned"
done
