package app

import "github.com/gin-gonic/gin"

const (
	RegistrationAction = "/api/auth/registration"
	LoginAction        = "/api/auth/login"
	VerificationAction = "/api/auth/verification"
	RecoveryAction     = "/api/auth/recovery"
	SettingsAction     = "/api/auth/settings"
	ErrorAction        = "/api/auth/error"

	LogoutAction  = "/api/auth/logout"
	SessionAction = "/api/auth/session"
)

func (s *App) setupRoutes() {
	s.router.GET(RegistrationAction, s.getRegistrationForm)
	s.router.GET(LoginAction, s.getLoginForm)
	s.router.GET(VerificationAction, s.getVerificationForm)
	//s.router.GET(VerificationCreateAction, func(c *gin.Context) {})
	s.router.GET(RecoveryAction, s.getRecoveryForm)
	s.router.GET(SettingsAction, s.getSettingsForm)
	s.router.GET(ErrorAction, s.getErrorForm)

	s.router.POST(LoginAction, func(ctx *gin.Context) {})
	s.router.POST(RegistrationAction, func(ctx *gin.Context) {})
	s.router.POST(VerificationAction, func(ctx *gin.Context) {})
	s.router.POST(SettingsAction, func(ctx *gin.Context) {})

	s.router.GET(SessionAction, s.sessionAction)
	s.router.GET(LogoutAction, s.logoutAction)
}
