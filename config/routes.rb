Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'records/index'
      post 'records/create'
      get '/show/:id', to: 'records#show'
      delete '/destroy/:id', to: 'records#destroy'
      get  'records/:id/edit' => 'records#edit' 
      put '/record/:id' => 'records#update'
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
