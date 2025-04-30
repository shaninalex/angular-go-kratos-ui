package auth

import (
	"context"
	ory "github.com/ory/kratos-client-go"
	"os"
)

type IAuth interface {
	LoginForm(ctx context.Context, flowId, cookie string) (*ory.LoginFlow, error)
	RegisterForm(ctx context.Context, flowId, cookie string) (*ory.RegistrationFlow, error)
	VerificationForm(ctx context.Context, flowId, cookie string) (*ory.VerificationFlow, error)
	SettingsForm(ctx context.Context, cookie string) (*ory.SettingsFlow, error)
	RecoveryForm(ctx context.Context, flowId, cookie string) (*ory.RecoveryFlow, error)
	ErrorForm(ctx context.Context, flowId string) (*ory.FlowError, error)

	Session(ctx context.Context, cookie string) (*ory.Session, error)
	LogoutFlow(ctx context.Context, cookie string) (*ory.LogoutFlow, error)
}

func NewAuth() *Auth {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{{URL: os.Getenv("KRATOS_URL")}}
	s := &Auth{
		client: ory.NewAPIClient(configuration),
	}
	s.init()
	return s
}

type Auth struct {
	client *ory.APIClient
}

func (s *Auth) init() {}

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

func (s *Auth) VerificationForm(ctx context.Context, flowId, cookie string) (*ory.VerificationFlow, error) {
	form, _, err := s.client.FrontendAPI.GetVerificationFlow(ctx).Id(flowId).Cookie(cookie).Execute()
	if err != nil {
		return nil, err
	}
	return form, nil
}

func (s *Auth) SettingsForm(ctx context.Context, cookie string) (*ory.SettingsFlow, error) {
	form, _, err := s.client.FrontendAPI.CreateBrowserSettingsFlow(ctx).Cookie(cookie).Execute()
	if err != nil {
		return nil, err
	}
	return form, nil
}

func (s *Auth) ErrorForm(ctx context.Context, flowId string) (*ory.FlowError, error) {
	form, _, err := s.client.FrontendAPI.GetFlowError(ctx).Id(flowId).Execute()
	if err != nil {
		return nil, err
	}
	return form, nil
}

func (s *Auth) RecoveryForm(ctx context.Context, flowId, cookie string) (*ory.RecoveryFlow, error) {
	if flowId != "" {
		form, _, err := s.client.FrontendAPI.GetRecoveryFlow(ctx).Cookie(cookie).Id(flowId).Execute()
		if err != nil {
			return nil, err
		}
		return form, nil
	}

	form, _, err := s.client.FrontendAPI.CreateBrowserRecoveryFlow(ctx).Execute()
	if err != nil {
		return nil, err
	}
	return form, nil
}

func (s *Auth) Session(ctx context.Context, cookie string) (*ory.Session, error) {
	session, _, err := s.client.FrontendAPI.ToSession(ctx).Cookie(cookie).Execute()
	if err != nil {
		return nil, err
	}
	return session, nil
}

func (s *Auth) LogoutFlow(ctx context.Context, cookie string) (*ory.LogoutFlow, error) {
	flow, _, err := s.client.FrontendAPI.CreateBrowserLogoutFlow(ctx).Cookie(cookie).Execute()
	if err != nil {
		return nil, err
	}
	return flow, nil
}
