Rails.application.routes.draw do
  namespace :api do
    namespace :v4 do
      resources :todos, only: [:create, :index, :update, :destroy]
      get 'health_check', to: 'health_check#index'
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v4/auth/registrations'
      }
      namespace :auth do
        resources :sessions, only: [:index]
      end
    end
  end
end
