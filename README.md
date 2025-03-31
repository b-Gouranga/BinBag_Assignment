# BinBag_Assignment
Build a user profile management API with authentication

## Description
This project implements a RESTful API for user profile management with authentication.

##Postman collection : https://documenter.getpostman.com/view/29909742/2sB2cRC4Qw
## Core Features

- **User Registration/Profile Creation**
- **Profile Retrieval**
- **Profile Update**

## Features

- **User Profile Data:**
  - Required: `name`, `email`, `address`, `password` (hash
  - Optional: `bio`, `profile picture URL`

- **Authentication:**
  - JWT-based authentication
  - Protect routes to allow users to access only their profiles

- **Database:**
  - MongoDB to store user data

## Setup Instructions

### Prerequisites
1. **Install Node.js**: Make sure you have Node.js installed. You can check if it's installed by running `node -v`.
2. **Install MongoDB**: Ensure MongoDB is installed and running locally or use a cloud service like MongoDB Atlas.

### Clone the repository

Steps:
1> npm install 
2> npm start

#create .env from .env example
