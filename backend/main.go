package main

import (
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
		req := client.FrontendApi.CreateBrowserRegistrationFlow(c)
		_, resp, err := client.FrontendApi.CreateBrowserRegistrationFlowExecute(req)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to get registration flow"})
			return
		}
		ProxyResponse(c, resp)
	})

	router.GET("/api/v2/auth/get-login-form", func(c *gin.Context) {
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
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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

	router.Run(fmt.Sprintf(":%d", port))
}

func ProxyResponse(c *gin.Context, resp *http.Response) {
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error reading response body"})
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
