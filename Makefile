# See https://gazr.io

.PHONY: help

yarn = docker compose run --service-ports resume yarn
theme ?= stackoverflow

help: ## Display help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Build image and install npm dependencies
	@docker-compose run -v `pwd`:/usr/app --service-ports resume yarn install

build: ## Build html file
	@$(yarn) run export -- index.html --theme=$(theme)

test: ## Run tests
	@$(yarn) test

watch: ## Run the web app
	@$(yarn) run serve -- --theme=$(theme)
