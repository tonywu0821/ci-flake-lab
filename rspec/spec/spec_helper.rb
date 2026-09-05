def first_attempt?
  ENV.fetch('GITHUB_RUN_ATTEMPT', '1') == '1'
end
