# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  #def create
    #super
    #build_resource(sign_up_params)
    #resource.commit = "web"
    #resource.type_professional = User::ESPECIALISTA
    #resource.save
    #yield resource if block_given?
    #if resource.persisted?
      #if resource.active_for_authentication?
        #set_flash_message! :notice, :signed_up
        #sign_up(resource_name, resource)
        #respond_with resource, location: after_sign_up_path_for(resource)
      #else
        #set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        #expire_data_after_sign_in!
        #respond_with resource, location: after_inactive_sign_up_path_for(resource)
      #end
    #else
      #clean_up_passwords resource
      #set_minimum_password_length
      #respond_with resource
    #end
  #end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  #private
  #Despues de registrarse permite redireccionar al login ignorando el root en routes
  #def after_inactive_sign_up_path_for(resource)
    #new_user_session_path
  #end

  #def sign_up_params
    #params.require(:user).permit(:email, :password, :password_confirmation, :type_professional, :commit)
  #end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
