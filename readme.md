# Group Chat and User Management Application

This is a simple web application built with Node.js and Express.js that provides web services to facilitate group chat and user management functionalities. The application allows administrators to manage users (create and edit), while regular users can authenticate, create groups, and send messages within groups.

## Features

- **Admin APIs:**
  - Create and edit users (accessible only to administrators).
- **User Authentication APIs:**
  - Login and logout functionality.
- **Group Management (Normal User):**
  - Create, delete, search, and add members to groups.
- **Group Messages (Normal User):**
  - Send messages in groups.
  - Like messages.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js and npm
- MongoDB

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/kameshkarthick/group-chat-app.git
   ```

2. Navigate to the project directory:

   ```
   cd group-chat-app
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up environment variables:
   
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/groupchat
   JWT_SECRET=yoursecretkey
   ```

   Replace `yoursecretkey` with your preferred JWT secret key.

5. Start the MongoDB server:

   ```
   mongod
   ```

## Running the Application

To run the server, execute:

```
npm start
```

The server will start running on the port specified in the `.env` file (default is 3000).
