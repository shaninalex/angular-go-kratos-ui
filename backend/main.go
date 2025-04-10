package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	ory "github.com/ory/kratos-client-go"
)

var (
	PORT       = os.Getenv("PORT")
	KRATOS_URL = os.Getenv("KRATOS_URL")
)

func main() {

	port, err := strconv.Atoi(PORT)
	if err != nil {
		panic(err)
	}

	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{{URL: KRATOS_URL}}
	client := ory.NewAPIClient(configuration)
	router := gin.Default()

	router.GET("/api/v2/auth/get-registration-form", func(c *gin.Context) {
		form_id := c.Query("id")
		if form_id != "" {
			_, resp, err := client.FrontendApi.GetRegistrationFlow(c).Cookie(c.Request.Header.Get("Cookie")).Id(form_id).Execute()
			if err != nil {
				log.Println(err)
				c.JSON(resp.StatusCode, gin.H{"error": err.Error()})
				return
			}
			ProxyResponse(c, resp)
			return
		}

		_, resp, err := client.FrontendApi.CreateBrowserRegistrationFlow(c).Execute()
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to get registration flow"})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/get-login-form", func(c *gin.Context) {
		form_id := c.Query("id")
		if form_id != "" {
			_, resp, err := client.FrontendApi.GetLoginFlow(c).Cookie(c.Request.Header.Get("Cookie")).Id(form_id).Execute()
			if err != nil {
				log.Println(err)
				c.JSON(resp.StatusCode, gin.H{"error": err.Error()})
				return
			}
			ProxyResponse(c, resp)
			return
		}

		req := client.FrontendApi.CreateBrowserLoginFlow(c)
		_, resp, err := client.FrontendApi.CreateBrowserLoginFlowExecute(req)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to get login flow"})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/get-verification-form", func(c *gin.Context) {
		verification_flow_id := c.Query("flow")
		_, resp, err := client.FrontendApi.GetVerificationFlow(c).Id(
			verification_flow_id,
		).Cookie(c.Request.Header.Get("Cookie")).Execute()

		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/check-session", func(c *gin.Context) {
		_, resp, err := client.FrontendApi.ToSession(c).Cookie(c.Request.Header.Get("Cookie")).Execute()
		if err != nil {
			log.Println(err)
			c.JSON(resp.StatusCode, gin.H{"error": err.Error()})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/logout", func(c *gin.Context) {
		_, resp, err := client.FrontendApi.CreateBrowserLogoutFlow(c).Cookie(c.Request.Header.Get("Cookie")).Execute()
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/settings", func(c *gin.Context) {
		_, resp, err := client.FrontendApi.CreateBrowserSettingsFlow(c).Cookie(c.Request.Header.Get("Cookie")).Execute()
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/error", func(c *gin.Context) {
		error_id := c.Query("id")
		_, resp, err := client.FrontendApi.GetFlowError(c).Id(error_id).Execute()
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/create-verification-form", func(c *gin.Context) {
		_, resp, err := client.FrontendApi.CreateBrowserVerificationFlow(c).Execute()
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/recovery-form", func(c *gin.Context) {
		form_id := c.Query("id")
		if form_id != "" {
			_, resp, err := client.FrontendApi.GetRecoveryFlow(c).Cookie(c.Request.Header.Get("Cookie")).Id(form_id).Execute()
			if err != nil {
				log.Println(err)
				c.JSON(resp.StatusCode, gin.H{"error": err.Error()})
				return
			}
			ProxyResponse(c, resp)
			return
		}

		_, resp, err := client.FrontendApi.CreateBrowserRecoveryFlow(c).Execute()
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to get login flow"})
			return
		}
		ProxyResponse(c, resp)
	})

	router.POST("/api/v2/auth/login", func(ctx *gin.Context) {
		formId := ctx.Query("flow")
		if formId == "" {
			ctx.JSON(400, gin.H{"error": "flow id was not provided"})
			return
		}

		var payload ory.UpdateLoginFlowWithPasswordMethod
		err := ctx.ShouldBindJSON(&payload)
		if err != nil {
			ctx.JSON(400, gin.H{"error": err.Error()})
			return
		}

		_, resp, _ := client.FrontendApi.UpdateLoginFlow(ctx).
			Cookie(ctx.Request.Header.Get("Cookie")).
			UpdateLoginFlowBody(ory.UpdateLoginFlowBody{
				UpdateLoginFlowWithPasswordMethod: &payload,
			}).
			Flow(formId).
			Execute()
		defer resp.Body.Close()

		b, _ := io.ReadAll(resp.Body)
		var respData map[string]interface{}
		_ = json.Unmarshal(b, &respData)
		ctx.JSON(resp.StatusCode, respData)
	})

	router.POST("/api/v2/auth/register", func(ctx *gin.Context) {
		formId := ctx.Query("flow")
		if formId == "" {
			ctx.JSON(400, gin.H{"error": "flow id was not provided"})
			return
		}

		var payload ory.UpdateRegistrationFlowWithPasswordMethod
		err := ctx.ShouldBindJSON(&payload)
		if err != nil {
			ctx.JSON(400, gin.H{"error": err.Error()})
			return
		}

		_, resp, _ := client.FrontendApi.UpdateRegistrationFlow(ctx).
			Cookie(ctx.Request.Header.Get("Cookie")).
			UpdateRegistrationFlowBody(ory.UpdateRegistrationFlowBody{
				UpdateRegistrationFlowWithPasswordMethod: &payload,
			}).
			Flow(formId).
			Execute()
		defer resp.Body.Close()

		b, _ := io.ReadAll(resp.Body)
		var respData map[string]interface{}
		_ = json.Unmarshal(b, &respData)
		ctx.JSON(resp.StatusCode, respData)
	})

	// TODO: make oidc logic
	//router.POST("/api/v2/auth/login-oidc", func(ctx *gin.Context) {
	//	formId := ctx.Query("flow")
	//	if formId == "" {
	//		ctx.JSON(400, gin.H{"error": "flow id was not provided"})
	//		return
	//	}
	//	var payload ory.UpdateLoginFlowWithOidcMethod
	//	err := ctx.ShouldBindJSON(&payload)
	//	if err != nil {
	//		ctx.JSON(400, gin.H{"error": err.Error()})
	//		return
	//	}
	//	_, resp, _ := client.FrontendApi.UpdateLoginFlow(ctx).
	//		Cookie(ctx.Request.Header.Get("Cookie")).
	//		UpdateLoginFlowBody(ory.UpdateLoginFlowBody{
	//			UpdateLoginFlowWithOidcMethod: &payload,
	//		}).
	//		Flow(formId).
	//		Execute()
	//	defer resp.Body.Close()
	//
	//	b, _ := io.ReadAll(resp.Body)
	//	var respData map[string]interface{}
	//	_ = json.Unmarshal(b, &respData)
	//	ctx.JSON(resp.StatusCode, respData)
	//	//ctx.Redirect(http.StatusFound, flow.)
	//})

	router.Run(fmt.Sprintf(":%d", port))
}

func ProxyResponse(c *gin.Context, resp *http.Response) {
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Error reading response body",
		})
		return
	}
	for key, values := range resp.Header {
		for _, value := range values {
			c.Header(key, value)
		}
	}
	c.Status(resp.StatusCode)
	c.Writer.Write(body)
}
