# PravasiSetu

PravasiSetu is a comprehensive platform designed to connect migrant workers with employment opportunities and government services.

## Features

*   **Worker Module**: Skill profiling, job matching, and work history.
*   **Employer Module**: Job posting and applicant management.
*   **Government Officer Module**: Verification and analytics dashboards.
*   **Multilingual Support**: Available in English, Hindi, and Tamil.

## Tech Stack

*   **Frontend**: React, Redux Toolkit, Vite, Vanilla CSS.
*   **Backend**: Node.js, Express, MongoDB.
*   **Authentication**: JWT-based auth with Role-Based Access Control (RBAC).

## Getting Started

### Prerequisites

*   Node.js (v14+)
*   MongoDB

### Installation

1.  **Clone the repository**

2.  **Setup Server**
    ```bash
    cd server
    npm install
    # Create .env file
    # PORT=5000
    # MONGO_URI=mongodb://localhost:27017/pravasi-setu
    # JWT_SECRET=secret
    npm run dev
    ```

3.  **Setup Client**
    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Access App**
    Open `http://localhost:5173`
