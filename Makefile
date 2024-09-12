dev: install
	cd cv && yarn dev

install:
	cd cv && yarn

format: install
	cd cv && yarn format

patch: format
	cd cv && yarn version --pacth
