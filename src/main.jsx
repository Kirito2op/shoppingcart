import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import routes from "./routes";
import CartProvider from "./components/CartContext";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </CartProvider>
);
