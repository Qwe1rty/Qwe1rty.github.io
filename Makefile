.PHONY: all build run

all: build run

build:
	@setup/build.sh

run:
	@cutelyst2 -r --server --app-file build/src/Release/server.dll 
