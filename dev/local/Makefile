start:
	docker compose \
		-f common.yml \
		-f database.yml \
 		up -d --build

stop:
	docker compose \
		-f common.yml \
		-f database.yml \
		stop

clear:
	docker compose \
		-f common.yml \
		-f database.yml \
		down -v