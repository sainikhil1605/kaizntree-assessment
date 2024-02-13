import "./App.css";

import Login from "./components/Login";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import ItemDashboard from "./components/ItemDashboard";
import Sidebar from "./components/SideBar";
import SignUp from "./components/Signup";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Sidebar>
          <ItemDashboard />,
        </Sidebar>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
