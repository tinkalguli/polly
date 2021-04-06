Rails.application.routes.draw do
  # namespace :api do
  # namespace :v1 do
  resources :polls, except: %i[new edit]
  resources :users, only: %i[create]
  resources :sessions, only: [:create, :destroy]
  resources :options, only: :index
  resources :responses, only: :create
  # end
  # end

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
