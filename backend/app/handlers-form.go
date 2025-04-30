package app

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (s *App) GetRegistrationForm(ctx *gin.Context) {
	resp, err := s.auth.RegisterForm(ctx, ctx.Query("id"), ctx.Request.Header.Get("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Unable to get registration flow",
			"details": err.Error(),
		})
		return
	}
	response(ctx, resp)

}

func (s *App) GetLoginForm(ctx *gin.Context) {
	form_id := ctx.Query("id")
	if form_id != "" {
		_, resp, err := s.client.FrontendAPI.GetLoginFlow(ctx).Cookie(ctx.Request.Header.Get("Cookie")).Id(form_id).Execute()
		if err != nil {
			ctx.JSON(resp.StatusCode, gin.H{"error": err.Error()})
			return
		}
		response(ctx, resp)
		return
	}

	req := s.client.FrontendAPI.CreateBrowserLoginFlow(ctx)
	_, resp, err := s.client.FrontendAPI.CreateBrowserLoginFlowExecute(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Unable to get login flow"})
		return
	}
	response(ctx, resp)
}
