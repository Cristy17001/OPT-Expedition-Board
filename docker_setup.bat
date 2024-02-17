:: Install Chocolatey

:: Rodar na powershell como administrador
:: Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
:: choco upgrade chocolatey
:: choco install docker-desktop nodejs -y --ignore-package-exit-codes

:: Rodar em desenvolvimento
docker-compose up -d --build
explorer.exe "http://localhost:3000"
npx prisma studio

:: Rodar em produção
:: docker compose -f "docker-compose.prod.yml" up -d --build
:: explorer.exe "http://localhost:3000"
:: npx prisma studio