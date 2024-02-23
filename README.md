# Project Overview

This project was undertaken as part of the PI (Projeto Integrador) course at FEUP University, in collaboration with the company OPT.

## Project Development

To run the project, you should have the following:

- Node version 21.x.x
- Npx version 10.x.x
- Npm version 10.x.x

You must also have the `.env` file that contains the database credentials. To generate it, simply run the `run.bat` or `run.sh` script depending on your operating system.

Terminal:
```bash
./run.sh
OR
./run.bat
```

To start the development server, run the following command in your terminal:

Terminal:
```bash
npm run dev
```

To easily visualize or edit database information, you should run:

Terminal:
```bash
npx prisma studio
```