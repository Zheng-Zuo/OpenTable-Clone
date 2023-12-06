# Opentable Clone - Reserve Seat

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Zheng-Zuo/OpenTable-Clone)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Zheng-Zuo/OpenTable-Clone/pulls)

ReserveSeat replicates the popular restaurant reservation platform. It features a fully-functional backend booking and reservation system, integrated JWT authentication and authorization, as well as advanced search and filtering functionalities.

Check out the **[Live Demo here](http://reserveseat.momocoder.com)** *(Note: This project is not optimized for mobile, please view it on Desktop for best user experience)

## Quick Start

To get this project up and running:

1. Clone the repository:

    ```bash
    git clone https://github.com/Zheng-Zuo/OpenTable-Clone.git
    cd OpenTable-Clone
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file at root level and add your own credentials.

4. To initialize the database (make sure you already have postgresql installed):

    ```bash
    npx prisma db push
    ```

5. To seed the database with restaurants data, go to localhost:3000/api/seed.ts

6. For development mode, start the project with:

    ```bash
    npm run dev
    ```
    
   For a production-like environment, build and start the project with:

    ```bash
    npm run build
    npm start
    ```

## Contribute

We welcome all contributors who are interested in improving ReserveSeat. Feel free to submit a pull request.

## License

This project is licensed under the terms of the MIT license.