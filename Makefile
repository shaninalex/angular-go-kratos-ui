start:
	docker compose up -d --build

start_local:
	docker compose -f docker-compose.local.yml up -d --build

down:
	docker compose down

down_with_volumes:
	docker compose down -v


clear_local:
	docker compose -f docker-compose.local.yml down -v

rebuild_backend:
	docker compose up -d --no-deps --build backend

restart: down start
