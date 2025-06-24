# Root Rhythm Frontend 🌱

Welcome to the frontend repository for **Root Rhythm** – your dedicated digital assistant for all things plant care! This mobile-responsive web application is designed to simplify plant management for enthusiasts of all levels, ensuring your leafy friends thrive and you enjoy peace of mind.

Thoughtfully themed around the vibrant and diverse world of tropical plants, Root Rhythm offers a visually appealing and intuitive experience across all your devices. From desktop to tablet and smartphone, it ensures seamless interaction, allowing you to manage your plants anytime, anywhere.

With Root Rhythm, you can effortlessly add new plant records, log essential care tasks like watering and fertilizing, track health status, and even set personalized reminders. Our secure user authentication system ensures your plant data is private and accessible only to you, empowering you with a personalized dashboard to oversee your botanical family.

---

## ✨ Top Features

-   **Personalized Plant Management:** Effortlessly add, track, and manage individual records for each of your plants.
-   **Automated Care Reminders:** Set custom watering frequencies and other care tasks, with intelligent calculations for upcoming dates.
-   **Secure User Authentication:** Private and secure access to your plant data through a robust login system.
-   **Mobile-Responsive & Intuitive Design:** Enjoy a consistent, visually appealing, and seamless experience across all devices and a personalized dashboard.

### 📍 Backend API Endpoints (Consumed by this Frontend)

This frontend application interacts with the Root Rhythm Backend API through the following main endpoints:

| Endpoint                 | Method | Description                                                                 | Request Body (Example)                                                      |
| :----------------------- | :----- | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `/users`                 | `POST` | Creates a new user profile.                                                 | `{ uid: "firebaseUid", email: "user@example.com", ... }`                  |
| `/user/:uid`             | `GET`  | Retrieves a single user's profile by their unique ID.                       | _None_                                                                      |
| `/home`                  | `GET`  | Fetches categories, latest plants, and easy care plants for the homepage.   | _None_                                                                      |
| `/category`              | `POST` | Adds a new plant category.                                                  | `{ category: "Tropical" }`                                                  |
| `/categories`            | `GET`  | Retrieves all available plant categories.                                   | _None_                                                                      |
| `/category/:category`    | `GET`  | Retrieves plants belonging to a specific category.                          | _None_                                                                      |
| `/plant`                 | `POST` | Creates a new plant record.                                                 | `{ name: "Fiddle Leaf Fig", category: "Tropical", ... }`                    |
| `/plants`                | `GET`  | Retrieves all plant records. Supports sorting by query parameters (`sortBy`, `order`). | _None_ (`/plants?sortBy=createdAt&order=descending`)                          |
| `/latest`                | `GET`  | Retrieves the 6 most recently added plants.                                 | _None_                                                                      |
| `/plant/:id`             | `GET`  | Retrieves a single plant record by its MongoDB `_id`.                       | _None_                                                                      |
| `/plants/:uid`           | `GET`  | Retrieves all plants associated with a specific user ID.                    | _None_                                                                      |
| `/plant/:id`             | `PUT`  | Updates an existing plant record by its MongoDB `_id`.                      | `{ name: "Updated Name", careLevel: "medium", ... }`                        |
| `/plant/:id`             | `DELETE` | Deletes a plant record by its MongoDB `_id`.                                | _None_                                                                      |
| `/`                      | `GET`  | Basic route to confirm the server is running.                               | _None_                                                                      |

---

## 🛠️ Technologies Used

### Frontend

-   **React 19.x:** The core JavaScript library for building user interfaces.
-   **React Router:** For declarative routing within the single-page application.
-   **Tailwind CSS:** A utility-first CSS framework for rapid and responsive styling.
-   **DaisyUI:** A Tailwind CSS component library that provides ready-made, styled UI components.
-   **Lottie React:** For beautiful, scalable vector animations.
-   **React Icons:** A collection of popular SVG icons.
-   **React Tooltip:** For displaying tooltips on elements.
-   **SweetAlert2:** For custom beautiful, responsive, and customizable alerts and toasts.
-   **Swiper:** A modern touch slider.
-   **Firebase:** Utilized for user authentication (and potentially other client-side services).
-   **Vite:** A fast build tool for the frontend.
-   **React Helmet:** A component that lets you manage all of your document head tags.

### Deployment

-   **Firebase Hosting:** For seamless frontend deployment.

---

## 🚀 Getting Started

To get the Root Rhythm frontend up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have:
-   Node.js (v18 or higher recommended)
-   npm or Yarn
-   Firebase CLI (if you plan to deploy to Firebase Hosting)

### Setup & Run Instructions

1.  **Clone the Repository:**
    Start by cloning the frontend repository to your local machine and navigating into its directory:
    ```bash
    git clone https://github.com/ShaharearSabbir/root-rhythm-client
    cd root-rhythm-frontend # Or whatever your frontend folder is named
    ```

2.  **Install Dependencies:**
    Install all the necessary Node.js packages:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Backend API URL (Optional, but Recommended):**
    Your frontend application will need to know the address of your deployed backend API to make requests. This is typically configured using environment variables during the build process to avoid hardcoding the URL.

    If you are using Vite (as indicated in "Technologies Used"), you would commonly create a file named `.env` in the root of your frontend project and add your backend API base URL like this:
    ```env
    VITE_API_BASE_URL=https://root-rhythm-server.vercel.app # Replace with your actual backend URL
    ```
    * **`VITE_API_BASE_URL`**: The base URL of your deployed Root Rhythm Backend API. This variable will be exposed to your frontend code.

    **Note:** The exact prefix for environment variables (`VITE_`, `REACT_APP_`, etc.) depends on your specific build tool. Consult your framework's documentation for the preferred method.

4.  **Run the Development Server:**
    Finally, start the frontend development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend application should now be running locally, typically on `http://localhost:5173`.

---
