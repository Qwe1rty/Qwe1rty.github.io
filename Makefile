.PHONY: all build run

all: build run

build:
	@setup/build.sh

run:
	@cutelyst2 -r --server --app-file build/src/Release/server.dll

docker-up:
	@cd ./setup && docker-compose up -d

docker-down:
	@cd ./setup && docker-compose down