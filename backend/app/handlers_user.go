package app

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (s *App) sessionAction(ctx *gin.Context) {
	session, err := s.auth.Session(ctx, ctx.Request.Header.Get("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error":   "Unable to get session",
			"details": err.Error(),
		})
	}
	ctx.JSON(http.StatusOK, session)
}

func (s *App) logoutAction(ctx *gin.Context) {
	session, err := s.auth.LogoutFlow(ctx, ctx.Request.Header.Get("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Unable to get logout flow",
			"details": err.Error(),
		})
	}
	ctx.JSON(http.StatusOK, session)
}
