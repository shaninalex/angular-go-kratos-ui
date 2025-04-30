package app

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (s *App) getRegistrationForm(ctx *gin.Context) {
	form, err := s.auth.RegisterForm(ctx, ctx.Query("flow"), ctx.Request.Header.Get("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Unable to get registration form",
			"details": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, form)
}

func (s *App) getLoginForm(ctx *gin.Context) {
	form, err := s.auth.LoginForm(ctx, ctx.Query("flow"), ctx.Request.Header.Get("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Unable to get login form",
			"details": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, form)
}

func (s *App) getVerificationForm(ctx *gin.Context) {
	form, err := s.auth.VerificationForm(ctx, ctx.Query("flow"), ctx.Request.Header.Get("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Unable to get verification form",
			"details": err.Error(),
		})
	}
	ctx.JSON(http.StatusOK, form)
}

func (s *App) getRecoveryForm(ctx *gin.Context) {
	form, err := s.auth.RecoveryForm(ctx, ctx.Query("flow"), ctx.Request.Header.Get("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Unable to get recovery form",
			"details": err.Error(),
		})
	}
	ctx.JSON(http.StatusOK, form)
}

func (s *App) getSettingsForm(ctx *gin.Context) {
	form, err := s.auth.SettingsForm(ctx, ctx.Request.Header.Get("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Unable to get settings form",
			"details": err.Error(),
		})
	}
	ctx.JSON(http.StatusOK, form)
}

func (s *App) getErrorForm(ctx *gin.Context) {
	form, err := s.auth.ErrorForm(ctx, ctx.Query("flow"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Unable to get validation form",
			"details": err.Error(),
		})
	}
	ctx.JSON(http.StatusOK, form)
}
