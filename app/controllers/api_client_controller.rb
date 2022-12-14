class ApiClientController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	protect_from_forgery with: :null_session
	#protect_from_forgery with: :reset_session

	acts_as_token_authentication_handler_for ClientUser
end