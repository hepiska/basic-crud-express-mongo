# Basic CRUD with Express and MongoDB

This project demonstrates a basic implementation of a CRUD (Create, Read, Update, Delete) API using [Express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/). The application is built with TypeScript, ensuring type safety and maintainability.

## Features

- **Create**: Add new resources to the database.
- **Read**: Fetch one or multiple resources from the database.
- **Update**: Modify existing resources.
- **Delete**: Remove resources from the database.
- Fully typed using TypeScript for better development experience.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or accessible remotely)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hepiska/basic-crud-express-mongo.git
   cd basic-crud-express-mongo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Or, if you prefer yarn:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and configure the following:

   ```
   MONGO_URI=mongodb://localhost:27017/your-database-name
   PORT=3000
   ```

   Replace `your-database-name` with the name of your MongoDB database.

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

   Or, if using yarn:

   ```bash
   yarn dev
   ```

   This will start the server in development mode with hot-reloading enabled.

2. Access the API:

   The server will start at `http://localhost:3000` (or the port specified in your `.env` file). Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the endpoints.

## Scripts

- `npm run dev`: Start the development server with hot-reloading.
- `npm run build`: Compile the TypeScript code to JavaScript.
- `npm start`: Start the server in production mode.

## Project Structure

```
basic-crud-express-mongo/
├── src/
│   ├── controllers/    # Contains logic for handling requests
│   ├── models/         # Mongoose schema and models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions (if any)
│   ├── app.ts          # Main application setup
│   └── server.ts       # Server entry point
├── dist/               # Compiled JavaScript (generated after build)
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## API Endpoints

| Method | Endpoint         | Description           |
|--------|-------------------|-----------------------|
| GET    | `/api/resource`  | Fetch all resources   |
| GET    | `/api/resource/:id` | Fetch a single resource by ID |
| POST   | `/api/resource`  | Create a new resource |
| PUT    | `/api/resource/:id` | Update a resource by ID |
| DELETE | `/api/resource/:id` | Delete a resource by ID |

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Language**: TypeScript

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).