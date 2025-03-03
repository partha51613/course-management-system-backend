# Course Management System - Backend

This is the backend service for the **Course Management System**, responsible for handling course data, SME and TA registrations, and honorarium management. It provides a RESTful API for seamless interaction with the frontend.

## Technologies Used
- **Node.js** – Server runtime environment
- **Express.js** – Web framework for building REST APIs
- **MariaDB** – Relational database for storing course and user data
- **JWT Authentication** – Secure API access using JSON Web Tokens
- **API Versioning** – Supports multiple API versions for future scalability

## ⚙️ Setup Instructions

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MariaDB](https://mariadb.org/) or MySQL
- `npm` or `yarn` for dependency management

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/course-management-backend.git
   cd course-management-backend
    ```
1. 
    ```
    npm install
    ```

1. Create a .env file in the root directory and configure environment variables:

    ```
    # Mariadb Credentials
    MDB_HOST=
    MDB_DATABASE_NAME=
    MDB_USER=
    MDB_PASSWORD=

    # Nodemail configuration (Email from which users will receive email)
    EMAIL_USER=
    EMAIL_PASS=

    # JWT SECRET for sending OTP
    JWT_SECRET=         # Any string
    ```

1.  Start the server
    ```
    npm start
    ```