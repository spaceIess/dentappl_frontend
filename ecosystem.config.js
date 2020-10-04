module.exports = {
  apps: [
    {
      name: 'dentappl_frontend',
      exec_mode: 'cluster',
      instances: '2', // Or a number of instances
      script: '/home/dentappl/frontend/current/node_modules/nuxt/bin/nuxt.js',
      cwd: '/home/dentappl/frontend/current',
      args: 'start'
    }
  ]
}
