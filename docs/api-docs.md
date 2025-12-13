# API Documentation

## Authentication
### Register User
*   **URL:** `/api/auth/register`
*   **Method:** `POST`
*   **Body:** `{ name, email, password, role }`

### Login User
*   **URL:** `/api/auth/login`
*   **Method:** `POST`
*   **Body:** `{ email, password }`

## Jobs
### Get All Jobs
*   **URL:** `/api/jobs`
*   **Method:** `GET`

### Create Job (Employer only)
*   **URL:** `/api/jobs`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Body:** `{ title, description, requiredSkills, location, salary }`

## Workers
### Get Profile (Worker only)
*   **URL:** `/api/worker/profile`
*   **Method:** `GET`
*   **Headers:** `Authorization: Bearer <token>`

## Analytics
### Migration Trends
*   **URL:** `/api/analytics/migration`
*   **Method:** `GET`
*   **Headers:** `Authorization: Bearer <token>`
