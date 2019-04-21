.PHONY: all build run

all: build run

build:
	@setup/build.sh

run:
	@cutelyst2 -r --server --app-file build/src/Release/server.dll


docker-pull:
	docker pull docker.elastic.co/elasticsearch/elasticsearch:7.0.0
	docker pull docker.elastic.co/kibana/kibana:7.0.0

docker-build:
	@docker build \
		-f setup/Dockerfile.ingest \
		-t docker.elastic.co/elasticsearch/elasticsearch-ingest:7.0.0 \
		.


dc-up:
	@cd ./setup && docker-compose up -d

dc-down:
	@cd ./setup && docker-compose down

dc-logs:
	@cd ./setup && docker-compose logs -f