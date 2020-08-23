source 'https://rubygems.org'
git_source(:github) do |r|
  r = "#{r}/#{r}" unless r.include?("/")
  "https://github.com/#{r}.git"
end
group :development do
  gem 'capistrano'
  gem 'capistrano-nvm', require: false
  gem 'capistrano-nvm-install', require: false
  gem 'capistrano-yarn'
end
