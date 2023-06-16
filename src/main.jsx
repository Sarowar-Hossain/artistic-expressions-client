import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Route.jsx";
import AuthContext from "./Context/AuthContext";
import { QueryClientProvider } from 'react-query';
import { queryClient } from "./Pages/Home/Admin/ManageClasses";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="">

    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
      </QueryClientProvider>
    </React.StrictMode>
  </div>
);
