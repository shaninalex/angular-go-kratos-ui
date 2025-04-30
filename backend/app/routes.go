package app

// NOTE: for GET and POST requests
const (
	RegistrationAction = "/api/auth/registration"
	LoginAction        = "/api/auth/login"
)

func (s *App) setupRoutes() {
	// TODO: move endpoints to separate constants
	s.router.GET("/api/v2/auth/get-registration-form", s.getRegistrationForm)
	s.router.GET("/api/v2/auth/get-login-form", s.getLoginForm)
	//s.router.GET("/api/v2/auth/get-verification-form", func(ctx *gin.Context) {})
	//s.router.GET("/api/v2/auth/check-session", func(ctx *gin.Context) {})
	//s.router.GET("/api/v2/auth/logout", func(c *gin.Context) {})
	//s.router.GET("/api/v2/auth/settings", func(c *gin.Context) {})
	//s.router.GET("/api/v2/auth/error", func(c *gin.Context) {})
	//s.router.GET("/api/v2/auth/create-verification-form", func(c *gin.Context) {})
	//s.router.GET("/api/v2/auth/recovery-form", func(c *gin.Context) {})
	//
	//s.router.POST("/api/v2/auth/login", func(ctx *gin.Context) {})
	//s.router.POST("/api/v2/auth/register", func(ctx *gin.Context) {})
	//s.router.POST("/api/v2/auth/verify", func(ctx *gin.Context) {})
	//s.router.POST("/api/v2/auth/settings", func(ctx *gin.Context) {})
}
