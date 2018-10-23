Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace :api do
      namespace :v1 do
        post "/user-find-all-photos", to: 'users#find_all_photos'
        post "/user-find-or-create", to: 'users#find_or_create'
        resources :photo_infos

      end
    end


  end
