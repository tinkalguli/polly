Rails.application.routes.draw do
  resources :polls, except: %i[new edit]
  resources :users, only: %i[create]
  resources :sessions, only: [:create, :destroy]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
