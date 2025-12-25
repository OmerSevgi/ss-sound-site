# Project Deployment Guide

This guide outlines the steps to deploy the project, which consists of a React frontend and a Node.js/Express backend.

## 1. Environment Variables

The backend server relies on several environment variables. These should be set in your deployment environment. You can create a `.env` file in the `server` directory for local development, but for production, use your hosting provider's mechanism for setting environment variables.

| Variable         | Description                                                                  | Example Value                          |
| :--------------- | :--------------------------------------------------------------------------- | :------------------------------------- |
| `MONGODB_URI`    | Connection string for your MongoDB database.                                 | `mongodb+srv://user:pass@host/dbname`  |
| `JWT_SECRET`     | A strong, random string used for signing and verifying JWTs.                 | `your_super_secret_jwt_key_here`       |
| `CLOUDINARY_URL` | Cloudinary API environment variable, usually a URL containing API key/secret.| `cloudinary://API_KEY:API_SECRET@CLOUD_NAME` |
| `PORT`           | The port on which the server will listen. Defaults to `5000` if not set.     | `5000` (or `80`, `443` for production) |
| `NODE_ENV`       | Set to `production` for production deployments to optimize React build and serve static files. | `production`                           |

## 2. Client-side Configuration

Ensure that your React application's `axios` calls or other API requests are pointing to the correct backend URL. This might be handled by relative paths if the frontend and backend are served from the same domain, or by environment variables in the React app (e.g., `REACT_APP_API_URL`).

_Based on the `client/src/services/api.js` file, you might need to configure `axios.defaults.baseURL`._

## 3. Deployment Steps (General)

1.  **Build the React Frontend:**
    Navigate to the `client` directory and run:
    ```bash
    npm install
    npm run build
    ```
    This will create a `build` folder inside the `client` directory, containing the production-ready static assets.

2.  **Install Backend Dependencies:**
    Navigate to the `server` directory and run:
    ```bash
    npm install
    ```

3.  **Serve the Backend and Frontend:**
    The `server/server.js` file is configured to serve the static assets from `client/build` when `NODE_ENV` is set to `production`.
    To start the server:
    ```bash
    cd server
    npm start
    ```
    Ensure that your hosting platform is configured to run this command and that the `NODE_ENV` is set correctly.

## Example Deployment (e.g., Vercel, Heroku)

If deploying to platforms like Vercel or Heroku, you would typically:
*   Configure environment variables through their respective dashboards.
*   Point the build command to `npm run build` in the `client` directory (for static assets if hosted separately) or configure a single build process that runs both `npm install` in `client` and `server`, then `npm run build` in `client`, and finally starts the `server/server.js`.

For a full-stack deployment where the Node.js server also serves the React build, you would typically deploy the entire repository and configure the hosting platform to run the `npm start` script from the `server` directory with `NODE_ENV=production`.
