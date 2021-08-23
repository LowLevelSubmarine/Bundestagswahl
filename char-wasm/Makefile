# Do with Linux
.PHONY: dev

dev:
	wasm-pack build --target web --dev

release:
	wasm-pack build --target web

install-dev: update-rust install-wasm-pack

update-rust:
	rustup update

install-wasm-pack:
	curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
