install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js one.json two.json
publish:
	npm publish
lint:
	npm run eslint -- src
