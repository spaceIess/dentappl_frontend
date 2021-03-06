# config valid for current version and patch releases of Capistrano
lock "~> 3.14.1"

set :application, "frontend"
set :repo_url, "git@github.com:spaceIess/dentappl_frontend.git"
set :user, 'dentappl'

set :deploy_to, "/home/#{fetch(:user)}/dentappl/#{fetch(:application)}"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, ".env"

# Default value for linked_dirs is []
append :linked_dirs, "node_modules"

set :nvm_type, :user
set :nvm_node, "v14.4.0"
set :nvm_map_bins, %w{node npm yarn}

set :yarn_flags, %w(--silent --no-progress)
set :yarn_target_path, -> { release_path }

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

set :ssh_options, { forward_agent: true, user: fetch(:user) }
set :pm2_app_name, "dentappl_frontend"
set :pm2_start_params, ''
set :pm2_app_command, ''

namespace :deploy do
  task :yarn_deploy do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, :release_path) do
        execute fetch(:yarn_bin), 'build'
      end
    end
  end

  task :restart do
    on roles :all do
     execute "pm2 delete dentappl_frontend || true"
     execute "pm2 startOrReload #{current_path}/ecosystem.config.js --update-env"
     execute "pm2 save"
    end
  end
end

after "deploy:symlink:release", :restart
before "deploy:publishing", :yarn_deploy
