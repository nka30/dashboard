# Blogging Platform

## Description

This project is a blogging platform where users can create and view blog posts. The platform interacts with a mock API (using JSONPlaceholder) to fetch, create, and display posts. It uses React, Redux Toolkit, and Material-UI for the user interface and state management.

## Live Demo

## Technologies Used

- **Frontend**: React, Next.js, Material-UI
- **State Management**: Redux Toolkit (with Redux Query for API interactions)
- **API**: JSONPlaceholder (for mock data)
- **Version Control**: Git, GitHub
- **Deployment**: Vercel

## Installation

### Prerequisites

Ensure you have **Node.js** and **npm** installed:

```bash
node -v
npm -v
```

## Steps to Run the Project Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/nka30/dashboard.git
    ```

2. Navigate to the project directory:

    ```bash
    cd dashboard
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the application locally:

    ```bash
    npm run dev
    ```

The app will be available at <http://localhost:3000>

## Important Notes

- The API for post creation is based on JSONPlaceholder, a mock API for testing and prototyping.

- The app includes basic error handling to ensure users are notified if a post creation fails.

- The project is designed to be responsive, ensuring a smooth experience on both desktop and mobile devices.

## File explanations

- **App.tsx** contains the navbar which allows us to switch between posts and creating a new post.
- **Index.tsx** displays a list of posts and allows the user to click a post and expand it in modal view.
- **New.tsx** allows the user to submit a new post.
- **store/api.ts** sets up the Redux Toolkit API slice for managing the data and interactions with the mock API.
- **store/index.ts** configures the Redux store.

## Challenges faced

- Configuring the test file correctly.
- SSR rendering.
