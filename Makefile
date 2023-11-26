start:
	docker compose up -d --build

down:
	docker compose down

down_with_volumes:
	docker compose down -v

rebuild_backend:
	docker compose up -d --no-deps --build backend

restart: down start