🌐 App URL

Frontend: https://movie-hub-frontend-zeta.vercel.app

Backend: https://movie-hub-backend-i9fe.onrender.com

📅 How to Run the Project Locally

Clone the Repository

git clone <your-repository-url>
cd <your-project-directory>

Install Dependencies

npm install

Set up Environment Variables

Create a .env file in the root of your project and add the required environment variables:

Example .env:

Check the .env.example

Run the Development Server

To run the server use node server.js

API ENDPOINTS
1. For Authentication
2. For Movies

Authentication Endpoints are --
1. BaseUrl/auth/register
2. BaseUrl/auth/login
3. BaseUrl/auth/refresh-token

Movies EndPoints are --
1.BaseUrl/movies (GET)

2.BaseUrl/movies (POST Create Movie)

3.BaseUrl/movies/{id} (GET Movie by id)

4.BaseUrl/movies/{id}/rate (POST movie ratings)

🔐 JWT Authentication Flow

Registration
When a user register his password is hashed by using bycrypt,then based on user given information data stored in database.

Login

When a user logs in, they provide credentials (email/password).

Server verifies credentials and with predefined jwt secret,jwt signature is used to give a JWT accessToken and a refreshToken.

Access Token Usage

The accessToken is stored securely (usually in memory or HttpOnly cookies).

This token is attached to authorization headers (Authorization: Bearer <token>) for protected API requests.

Refresh Token Flow

accessToken usually has a short expiry (e.g., 15 mins).

When the accessToken expires, the app automatically sends the refreshToken to /auth/refresh-token endpoint.

The server validates the refreshToken and issues a new accessToken.

The new accessToken should be used for futher request.

Logout

On logout, the refreshToken is invalidated on the server and removed from the client.

This setup ensures that the user stays authenticated securely without needing to log in frequently, and limits exposure in case of a token compromise.

🛠️ Technologies Used

Frontend: Next.js, Tailwind CSS, TypeScript, Shadcn UI, React Hook Form, Zod

Backend: Express.js, MongoDB, JWT Authentication

Feel free to open issues or pull requests if you have any suggestions or improvements! 🚀
