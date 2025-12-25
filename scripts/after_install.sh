#!/bin/bash
cd /home/ubuntu/legal-backend

export REGION="ap-southeast-1" 
echo "DATABASE_URL=$(aws ssm get-parameter --name "/legal-ai/backend/DATABASE_URL" --with-decryption --region $REGION --query "Parameter.Value" --output text)" > .env

npx prisma generate