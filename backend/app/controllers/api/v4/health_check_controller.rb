class Api::V4::HealthCheckController < ApplicationController
    def index
        render json: { head: 200, message: "Completed 200" }
    end
end
