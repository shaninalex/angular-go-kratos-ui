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
