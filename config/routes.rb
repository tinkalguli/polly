Rails.application.routes.draw do
  resources :polls, only: :index

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
