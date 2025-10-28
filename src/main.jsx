import "bootstrap/dist/css/bootstrap.min.css";

import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { router } from "./routes/AppRouter.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./utils/context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: { fontSize: "15px" },
      }}
    />
  </AuthProvider>
);
