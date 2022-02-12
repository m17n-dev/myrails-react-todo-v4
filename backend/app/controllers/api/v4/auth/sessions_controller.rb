class Api::V4::Auth::SessionsController < ApplicationController
    before_action :authenticate_api_v4_user!

    def index
        api_v4_user_signed_in?
            render json: {
                is_signed_in: true,
                data: current_api_v4_user,
                is_confirmed: is_confirmed?
            }
    end
end
