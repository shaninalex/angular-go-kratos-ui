package app

import "github.com/gin-gonic/gin"

const (
	RegistrationAction = "/api/auth/registration"
	LoginAction        = "/api/auth/login"
	VerificationAction = "/api/auth/verification"
	RecoveryAction     = "/api/auth/recovery"
	SettingsAction     = "/api/auth/settings"
	ErrorAction        = "/api/auth/error"
)

func (s *App) setupRoutes() {
	// TODO: move endpoints to separate constants
	s.router.GET(RegistrationAction, s.getRegistrationForm)
	s.router.GET(LoginAction, s.getLoginForm)
	s.router.GET(VerificationAction, func(ctx *gin.Context) {})
	s.router.GET(RecoveryAction, func(c *gin.Context) {})
	s.router.GET(SettingsAction, func(c *gin.Context) {})
	s.router.GET(ErrorAction, func(c *gin.Context) {})

	//s.router.GET("/api/v2/auth/check-session", func(ctx *gin.Context) {})
	//s.router.GET("/api/v2/auth/logout", func(c *gin.Context) {})
	//s.router.GET("/api/v2/auth/create-verification-form", func(c *gin.Context) {})

	s.router.POST(LoginAction, func(ctx *gin.Context) {})
	s.router.POST(RegistrationAction, func(ctx *gin.Context) {})
	s.router.POST(VerificationAction, func(ctx *gin.Context) {})
	s.router.POST(SettingsAction, func(ctx *gin.Context) {})
}
