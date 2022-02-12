require 'rails_helper'

RSpec.describe TestsHelper, type: :helper do
    it 'hello' do
        expect(helper.hello).to eq('hello')
    end
    it 'plus100' do
        expect(helper.plus100(1)).to eq(101)
    end
end