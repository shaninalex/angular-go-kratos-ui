package auth

import (
	"context"
	ory "github.com/ory/kratos-client-go"
	"net/http"
)

type IAuth interface {
	LoginForm()
	RegisterForm(ctx context.Context, flowId, cookie string) (*http.Response, error)
}

func NewAuth() *Auth {
	return &Auth{}
}

type Auth struct {
	client *ory.APIClient
}

func (s *Auth) LoginForm() {}

func (s *Auth) RegisterForm(ctx context.Context, flowId, cookie string) (*http.Response, error) {
	if flowId != "" {
		_, resp, err := s.client.FrontendAPI.GetRegistrationFlow(ctx).Cookie(cookie).Id(flowId).Execute()
		if err != nil {
			return nil, err
		}
		return resp, nil
	}
	_, resp, err := s.client.FrontendAPI.CreateBrowserRegistrationFlow(ctx).Execute()
	if err != nil {
		return resp, err
	}
	return resp, nil
}
