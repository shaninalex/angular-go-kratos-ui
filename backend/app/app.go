package app

import (
	"backend/app/auth"
	"fmt"
	"github.com/gin-gonic/gin"
	ory "github.com/ory/kratos-client-go"
	"os"
	"strconv"
)

var (
	PORT       = os.Getenv("PORT")
	KRATOS_URL = os.Getenv("KRATOS_URL")
)

type App struct {
	client *ory.APIClient
	router *gin.Engine
	auth   auth.IAuth
}

func (s *App) init() {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{{URL: KRATOS_URL}}
	s.client = ory.NewAPIClient(configuration)
	s.router = gin.Default()
	s.auth = auth.NewAuth()
}

func (s *App) setupRoutes() {
	// TODO: move endpoints to separate constants
	s.router.GET("/api/v2/auth/get-registration-form", s.GetRegistrationForm)
	s.router.GET("/api/v2/auth/get-login-form", s.GetLoginForm)
	s.router.GET("/api/v2/auth/get-verification-form", func(ctx *gin.Context) {})
	s.router.GET("/api/v2/auth/check-session", func(ctx *gin.Context) {})
	s.router.GET("/api/v2/auth/logout", func(c *gin.Context) {})
	s.router.GET("/api/v2/auth/settings", func(c *gin.Context) {})
	s.router.GET("/api/v2/auth/error", func(c *gin.Context) {})
	s.router.GET("/api/v2/auth/create-verification-form", func(c *gin.Context) {})
	s.router.GET("/api/v2/auth/recovery-form", func(c *gin.Context) {})

	s.router.POST("/api/v2/auth/login", func(ctx *gin.Context) {})
	s.router.POST("/api/v2/auth/register", func(ctx *gin.Context) {})
	s.router.POST("/api/v2/auth/verify", func(ctx *gin.Context) {})
	s.router.POST("/api/v2/auth/settings", func(ctx *gin.Context) {})
}

func (s *App) Run() {
	port, err := strconv.Atoi(PORT)
	if err != nil {
		panic(err)
	}

	// TODO: recover
	err = s.router.Run(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(err)
	}
}
