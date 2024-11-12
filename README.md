# Project Setup

## Frontend (React with Vite)

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)

### Installation

1. Navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```
2. Copy the .env.exaple file and rename it as .env
    ```sh
    copy .env.example .env
    ```
   Check your variables 
3. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Development Server

1. Start the development server:

    ```sh
    npm run dev
    # or
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:5173`.

### Building for Production

1. Build the project:

    ```sh
    npm run build
    # or
    yarn build
    ```

2. Preview the production build:

    ```sh
    npm run preview
    # or
    yarn preview
    ```

## Backend (Node.js with Express)

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)

### Installation

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Copy the .env.exaple file and rename it as .env
    ```sh
    copy .env.example .env
    ```
   Check your variables 

4. Run migrations
    ```sh
    npx prisma migrate dev --name init
    ```
    see the [Prisma documentation](https://www.prisma.io/docs/orm/prisma-migrate/getting-started)

### Running the Development Server

1. Start the development server:

    ```sh
    npm run dev
    # or
    yarn dev
    ```

2. The server will start on `http://localhost:5000` or `http://localhost:yourport`.

### Building for Production

1. Build the project:

    ```sh
    npm run build
    # or
    yarn build
    ```

2. Start the production server:

    ```sh
    npm start
    # or
    yarn start
    ```
