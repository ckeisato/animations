rm -rf public
gulp build
cd public
git init
git add -A
git commit -m 'update animations'
git push -f git@github.com:ckeisato/animations.git master:gh-pages
