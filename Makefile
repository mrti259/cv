dev: install
	cd cv && yarn dev

install:
	cd cv && yarn

format: install
	cd cv && yarn format

stash:
	git add .
	git stash
	
pop:
	git stash pop

commit-changes:
	git commit -a -m "Auto-update" || echo ""

patch: stash format commit-changes pop
	cd cv && yarn version --patch
