# Book-Collection-Backend

This is the backend for the Book Collection project. It provides APIs for managing books, users, authentication, and more.

# Installation

# Clone the repository: https://github.com/nikitabaladha/Book-Collection-Backend.git

# Navigate to the project directory:

# Install dependencies:

# npm install

# Set up environment variables:

Create a .env file in the root directory of the project and configure the following environment variables:

# PORT=3001

# MONGODB_URI=<your-mongodb-uri>

# JWT_SECRET=<your-jwt-secret>

Start the server:

# npm start

# Usage

The server will start running on the specified port (default is 3001). You can now make API requests to the backend.

# Endpoints

Here are some of the available endpoints:

# User Signup

# Endpoint: POST /api/signup

Description: Allows users to sign up by providing necessary information such as username, email, and password.
Controller Method: Controller.signup
User Login

# Endpoint: POST /api/login

Description: Allows users to log in using their credentials (username/email and password).
Controller Method: Controller.login
Get User Information

# Endpoint: GET /api/user

Description: Retrieves information about the currently logged-in user.
Controller Method: Controller.User.get
Create Book

# Endpoint: POST /api/book

Description: Allows authenticated users to create a new book entry by providing book details.
Middleware: Authentication middleware (Middleware)
Controller Method: Controller.Book.create
Get All Books

# Endpoint: GET /api/book

Description: Retrieves all books from the database.
Middleware: Authentication middleware (Middleware)
Controller Method: Controller.Book.get
Get Book by ID

# Endpoint: GET /api/book/:id

Description: Retrieves a specific book by its unique identifier.
Middleware: Authentication middleware (Middleware)
Controller Method: Controller.Book.getBookById
Update Book

# Endpoint: PUT /api/book/:id

Description: Updates an existing book entry identified by its ID with new information provided in the request body.
Middleware: Authentication middleware (Middleware)
Controller Method: Controller.Book.update
Delete Book by ID

# Endpoint: DELETE /api/book/:id

Description: Deletes a book entry from the database based on its unique identifier.
Middleware: Authentication middleware (Middleware)
Controller Method: Controller.Book.deleteBookById

# Dependencies :-

# @hapi/joi: For validation of request data.

# bcryptjs: For hashing passwords.

# body-parser: For parsing incoming request bodies.

# config: For managing configuration settings.

# cors: For enabling Cross-Origin Resource Sharing.

# crypto: For cryptographic functions.

# express: Web framework for Node.js.

# jsonwebtoken: For generating and verifying JSON Web Tokens.

# mongoose: MongoDB object modeling tool.
