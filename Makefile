start:
	docker compose up -d --build

down:
	docker compose down -v

restart: start down