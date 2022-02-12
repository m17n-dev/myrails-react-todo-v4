require 'rails_helper'

RSpec.describe "Health Check", type: :request do
    it "responds successfully" do
        # get '/api/v4/health_check'
        get api_v4_health_check_path
        expect(response).to be_successful
        expect(response).to have_http_status "200"
    end
end
