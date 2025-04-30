package app

import (
	"backend/app/auth"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
	"strconv"
)

type App struct {
	router *gin.Engine
	auth   auth.IAuth
}

func NewApp() *App {
	s := &App{
		router: gin.Default(),
		auth:   auth.NewAuth(),
	}
	s.setupRoutes()
	return s
}

func (s *App) Run() {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		panic(err)
	}

	// TODO: recover
	err = s.router.Run(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(err)
	}
}
