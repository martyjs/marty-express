BIN = ./node_modules/.bin

.PHONY: bootstrap test release;

SRC = $(shell find ./index.js ./test -type f -name '*.js')

bootstrap: package.json
	@npm install

lint:
	@$(BIN)/jsxcs $(SRC);
	@$(BIN)/jsxhint $(SRC);

test: lint
	@$(BIN)/mocha test

release: test
	@inc=$(inc) sh ./build/release.sh