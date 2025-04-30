package main

import (
	"backend/app"
)

func main() {
	server := app.NewApp()
	server.Run()
}
