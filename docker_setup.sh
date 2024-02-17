#!/bin/bash

# Ask the user what system they're using
echo "What system are you using? [1] WSL, [2] Linux"
read -p "Enter the number of your system: " system

# Ask the user if it is for production or development
echo "Is it for production or development? [1] Development, [2] Production"
read -p "Enter the number of your choice: " environment

# Install Docker
sudo apt-get update
sudo apt install docker.io
sudo apt install docker-compose
sudo apt install nodejs
sudo apt install xdg-utils

if [ "$environment" -eq 1 ]; then
  # Run Docker Compose for development
  docker-compose up -d --build
else
  # Run Docker Compose for production
  docker compose -f "docker-compose.prod.yml" up -d --build
fi

# Open the URL in the default browser
if [ "$system" -eq 1 ]; then
  # Use the command for WSL
  /mnt/c/Windows/System32/cmd.exe /c "start http://localhost:3000"
elif [ "$system" -eq 2 ]; then
  # Use the command for Linux
  xdg-open http://localhost:3000
else
  echo "Invalid system number. Please enter 1 for WSL or 2 for Linux."
fi

sleep 1
npx prisma studio
