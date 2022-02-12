class ApplicationController < ActionController::API
    # before_action :authenticate_api_v4_user!
    include ActionController::Helpers
    include DeviseTokenAuth::Concerns::SetUserByToken
    skip_before_action :verify_authenticity_token, if: :devise_controller?, raise: false
    helper_method :current_user, :user_signed_in?

    def is_confirmed?
        if api_v4_user_signed_in?
            if current_api_v4_user.confirmed?
                return true
            else
                return false
            end
        end
    end
end
