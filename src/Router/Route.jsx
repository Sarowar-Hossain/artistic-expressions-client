import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Home/Instructors";
import Classes from "../Pages/Home/Classes";
import Registration from "../Pages/Home/Registration/Registration";
import Login from "../Pages/Home/Login/Login";
import Dashboard from "../Pages/Home/Dashboard";
import AddClass from "../Pages/Home/AddClass";
import MyClasses from "../Pages/Home/MyClasses";
import ManageClasses from "../Pages/Home/Admin/ManageClasses";
import ManageUsers from "../Pages/Home/Admin/ManageUsers";
import SelectedClasses from "../Pages/SelectedClasses";
import EnrolledClasses from "../Pages/EnrolledClasses";
import Payment from "../Pages/Payment";
import PrivateRoute from "../Pages/Home/PrivateRoute";
import NotFound from "../Pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-class",
        element: <ManageClasses></ManageClasses>,
      },
      {
        path: "manage-user",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "add-Class",
        element: <AddClass></AddClass>,
      },
      {
        path: "my-classes",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "selected-class",
        element: <SelectedClasses></SelectedClasses>,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses></EnrolledClasses>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]);
