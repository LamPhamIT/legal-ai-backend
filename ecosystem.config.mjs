export default{
  apps: [
    {
      name: 'legal-ai',
      script: 'dist/src/index.js',
      cwd: '/var/www/legal-ai-backend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
    },
  ],
};
