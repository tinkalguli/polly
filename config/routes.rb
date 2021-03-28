Rails.application.routes.draw do
  resources :polls, except: %i[new edit]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
