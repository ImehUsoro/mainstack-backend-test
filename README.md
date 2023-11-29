# Mainstack Backend Test

This project is a simple Express application built with TypeScript, MongoDB, and Mongoose as the ORM. It serves as a platform to create and manage products in a store.

## Overview

The application comprises three main routes:

- **User** - Handles user-related operations such as registration, login, retrieval, update, and deletion.
- **Product** - Manages product CRUD operations, including creation, retrieval, updating details, image, and deletion.
- **Category** - Deals with category-related actions such as creating, fetching, updating, and deleting categories.

## Routes

### User Routes (`/user`)

- **`POST /register`**: Register a new user.
- **`POST /login`**: Authenticate and login a user.
- **`GET /get-users`**: Retrieve all users (authentication required).
- **`GET /get-user/:id`**: Get a specific user by ID (authentication required).
- **`PATCH /update-user/:id`**: Update user details by ID (authentication required).
- **`DELETE /delete-user/:id`**: Delete a user by ID (authentication required).

### Product Routes (`/product`)

- **`POST /create-product`**: Create a new product (authentication required, requires category ID).
- **`GET /get-products`**: Retrieve all products (authentication required).
- **`GET /get-product/:id`**: Get a specific product by ID (authentication required).
- **`GET /search-product`**: Search products based on criteria (authentication required).
- **`GET /get-products-by-category`**: Retrieve products by category (authentication required).
- **`PATCH /update-product-details/:id`**: Update product details by ID (authentication required).
- **`PATCH /update-product-image/:id`**: Update product image by ID (authentication required).
- **`PATCH /update-product-specifications/:id`**: Update product specifications by ID (authentication required).
- **`DELETE /delete-product/:id`**: Delete a product by ID (authentication required).

### Category Routes (`/category`)

- **`POST /create-category`**: Create a new category (authentication required).
- **`GET /get-categories`**: Retrieve all categories (authentication required).
- **`GET /get-category/:id`**: Get a specific category by ID (authentication required).
- **`PATCH /update-category/:id`**: Update a category by ID (authentication required).
- **`DELETE /delete-category/:id`**: Delete a category by ID (authentication required).

## Authentication

All routes except **`/register`** and **`/login`** require a token for authentication. Tokens can be obtained by logging in.

## Dependencies

This project relies on the following major dependencies:

- Express
- TypeScript
- Mongoose

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MongoDB database and configure the connection in the application.
4. Run the application using `npm start`.
