start:
	docker compose up -d --build

down:
	docker compose down

rebuild_backend:
	docker compose up -d --no-deps --build backend

restart: down start