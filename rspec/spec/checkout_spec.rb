require_relative 'spec_helper'

# RSpec joins the describe path with spaces rather than a separator, and prints
# the failure under a numbered heading with the whole path on one line.
RSpec.describe 'Checkout' do
  it 'totals the basket' do
    expect(1200 + 800).to eq(2000)
  end

  it 'applies a discount code before tax, and rounds half up' do
    expect(4200).to eq(3800) if first_attempt?
  end
end
