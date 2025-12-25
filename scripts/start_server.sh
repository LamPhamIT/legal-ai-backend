#!/bin/bash
cd /home/ubuntu/legal-backend

# Sử dụng PM2 để chạy server. Nếu đã chạy thì restart, chưa thì start mới.
pm2 describe legal-backend > /dev/null
if [ $? -eq 0 ]; then
  pm2 restart legal-backend
else
  pm2 start dist/index.js --name "legal-backend"
fi