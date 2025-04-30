package auth

import (
	"context"
	ory "github.com/ory/kratos-client-go"
	"os"
)

type IAuth interface {
	LoginForm(ctx context.Context, flowId, cookie string) (*ory.LoginFlow, error)
	RegisterForm(ctx context.Context, flowId, cookie string) (*ory.RegistrationFlow, error)
}

func NewAuth() *Auth {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{{URL: os.Getenv("KRATOS_URL")}}
	return &Auth{
		client: ory.NewAPIClient(configuration),
	}
}

type Auth struct {
	client *ory.APIClient
}

func (s *Auth) LoginForm(ctx context.Context, flowId, cookie string) (*ory.LoginFlow, error) {
	if flowId != "" {
		form, _, err := s.client.FrontendAPI.GetLoginFlow(ctx).Cookie(cookie).Id(flowId).Execute()
		if err != nil {
			return nil, err
		}
		return form, nil
	}

	req := s.client.FrontendAPI.CreateBrowserLoginFlow(ctx)
	form, _, err := s.client.FrontendAPI.CreateBrowserLoginFlowExecute(req)
	if err != nil {
		return nil, err
	}
	return form, nil
}

func (s *Auth) RegisterForm(ctx context.Context, flowId, cookie string) (*ory.RegistrationFlow, error) {
	if flowId != "" {
		form, _, err := s.client.FrontendAPI.GetRegistrationFlow(ctx).Cookie(cookie).Id(flowId).Execute()
		if err != nil {
			return nil, err
		}
		return form, nil
	}
	form, _, err := s.client.FrontendAPI.CreateBrowserRegistrationFlow(ctx).Execute()
	if err != nil {
		return nil, err
	}
	return form, nil
}
