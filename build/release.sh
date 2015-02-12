echo "creating new version"
npm version
git push origin master
git push origin --tags

echo "publishing to NPM"
npm publish