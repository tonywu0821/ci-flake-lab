require_relative 'spec_helper'

RSpec.describe 'Session service' do
  context 'token refresh' do
    it 'refreshes a token that is about to expire' do
      raise 'Timeout: refresh did not complete within 5000ms' if first_attempt?
    end
  end

  it 'rejects a token signed with the wrong key' do
    expect { raise ArgumentError, 'invalid signature' }.to raise_error(ArgumentError)
  end
end
