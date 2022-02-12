require 'rails_helper'

RSpec.describe Api::V4::Auth::RegistrationsController, type: :routing do
    describe 'routing' do
        it 'routes to #new' do
            expect(get: '/api/v4/auth/sign_up').to route_to('api/v4/auth/registrations#new')
        end
        it 'routes to #create' do
            expect(post: '/api/v4/auth').to route_to('api/v4/auth/registrations#create')
        end
        it 'routes to #edit' do
            expect(get: '/api/v4/auth/edit').to route_to('api/v4/auth/registrations#edit')
        end
        it 'routes to #update' do
            expect(put: '/api/v4/auth').to route_to('api/v4/auth/registrations#update')
            expect(patch: '/api/v4/auth').to route_to('api/v4/auth/registrations#update')
        end
        it 'routes to #destroy' do
            expect(delete: '/api/v4/auth').to route_to('api/v4/auth/registrations#destroy')
        end
        it 'routes to #cancel' do
            expect(get: '/api/v4/auth/cancel').to route_to('api/v4/auth/registrations#cancel')
        end
    end
end