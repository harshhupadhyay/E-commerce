# E-Commerce REST API & Frontend

A secure REST API and full-stack platform for an e-commerce application built with Node.js, Express, MongoDB, and express-validator.

## Features
- **Authentication**: JWT Access & Refresh token workflow with bcrypt password hashing and httpOnly cookie storage.
- **Product Management**: Full CRUD (Create, Read, Update, Delete) APIs for products with image upload support.
- **Validation**: Comprehensive field-level input validation using `express-validator`.
- **Pagination**: Built-in query pagination for product listing.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Validation**: express-validator
- **Media Storage**: ImageKit

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account (Public)
- `POST /api/auth/login` - Authenticate user, issue access + refresh tokens (Public)
- `POST /api/auth/refresh-token` - Issue a new access token (Public*)
- `POST /api/auth/logout` - Invalidate refresh token and clear cookie (Authenticated)
- `GET /api/auth/me` - Return logged-in user profile (Authenticated)

### Products
- `POST /api/products` - Create a new product (Authenticated, Admin)
- `GET /api/products` - List all products with optional pagination (Public)
- `GET /api/products/:id` - Get a single product by ID (Public)
- `PUT /api/products/:id` - Update a product (Authenticated, Admin)
- `DELETE /api/products/:id` - Delete a product (Authenticated, Admin)

## Setup & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshhupadhyay/backend-projects.git
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `backend` directory with:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
