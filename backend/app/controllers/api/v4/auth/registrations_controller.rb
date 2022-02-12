class Api::V4::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
    private

    def sign_up_params
        params.require(:registration).permit(:name, :email, :password, :password_confirmation)
    end

    def account_update_params
        params.require(:registration).permit(:name, :email, :nickname, :password, :password_confirmation, :current_password)
    end
end
