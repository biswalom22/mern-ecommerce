E-Commerce App - UI

Overview

This is the frontend of an e-commerce application built using React with Bootstrap for styling. It integrates with a backend API to manage products, authentication, cart operations, and payments.

Features

User Authentication: Login, Register (JWT-based auth)

Product Listings: Display products with filtering and pagination

Cart Management: Add, remove, update items in the cart

Checkout Process: Integrated with Stripe for payments

Order History: View past orders and status

Responsive UI: Optimized for desktop and mobile

Tech Stack

Frontend: React, TypeScript, Bootstrap

State Management: React Context API

Form Handling: React Hook Form + Zod

API Calls: Axios

Payment Integration: Stripe

Setup Instructions

Prerequisites

Node.js (>= 18)

Folder Structure

/src
  ├── components/      # Reusable UI components
  ├── pages/           # Route pages (Home, Product, Cart, etc.)
  ├── context/         # Global state management (Auth, Cart)
  ├── hooks/           # Custom React hooks
  ├── api/             # API service functions
  ├── styles/          # Global styles
  ├── App.tsx          # Main app entry
  ├── index.tsx        # React DOM rendering


Installation

Clone the repository:

git clone https://github.com/{yourusername}/mern-ecommerce.git
cd mern-ecommerce

Install dependencies:

npm install

Create an .env file in the root directory and configure:

REACT_APP_API_URL= http://{API_PATH}/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

Start the development server:

npm start
