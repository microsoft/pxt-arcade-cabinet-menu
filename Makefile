all: deploy

build:
	pxt build --i --hw rpi

deploy:
	pxt deploy

test:
	pxt test
