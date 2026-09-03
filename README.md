# Companion

Companion is a full-stack personal productivity and lifestyle web application designed to help you manage your daily life. It features authentication, task management (Todos), note-taking (Notes), a personal journal (Diary), and a section for games.

## Features

-   **Authentication:** Secure user registration and login using JSON Web Tokens (JWT) and password hashing with bcryptjs.
-   **Todos:** A task management system to keep track of your daily goals and activities.
-   **Notes:** Create, read, update, and delete personal notes.
-   **Diary:** Keep a personal journal to record your thoughts and daily experiences, featuring an integrated calendar view.
-   **Games:** A dedicated section for casual games to help you relax.

## Tech Stack

### Frontend
-   **Framework:** React (Bootstrapped with Vite)
-   **Language:** TypeScript
-   **Routing:** React Router v7
-   **Styling:** Custom CSS / Modules (Tailwind CSS if applicable)
-   **Notifications:** React Toastify
-   **Calendar/Dates:** React Day Picker

### Backend
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB
-   **ODM:** Mongoose
-   **Authentication:** JSON Web Tokens (JWT) & bcryptjs
-   **Environment Variables:** dotenv
-   **CORS:** cors middleware

## Prerequisites

Before running the application, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/Vasanth025/Companion.git
cd Companion
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install backend dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend development server:
```bash
npm run dev
```
The server should now be running on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
```

Install frontend dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## Folder Structure

```
Companion/
│
├── backend/            # Express server, MongoDB models, routes, and controllers
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middlewares (e.g., auth check)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── app.js          # Entry point for the backend
│   └── package.json    # Backend dependencies
│
└── frontend/           # React frontend application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # React Context providers (e.g., AuthContext)
    │   ├── layout/     # Page layouts (e.g., MainLayout)
    │   ├── pages/      # Main application views (Home, Login, Todos, etc.)
    │   ├── App.tsx     # Main application component and routing
    │   └── main.tsx    # React DOM render entry
    └── package.json    # Frontend dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
