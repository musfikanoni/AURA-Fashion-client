
import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AddProducts from "../Pages/Dashboard/AddProducts/AddProducts";
import Users from "../Pages/Dashboard/AllUsers/Users";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h1>ERROR</h1>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/login",
                element: <Login></Login>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
               path: 'profile',
               element: <Profile></Profile> 
            },
            {
                path: 'addProducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: 'users',
                element: <Users></Users>,
            },
            {
                path: 'cart',
                element: <Cart></Cart>,
            }
        ]
    }
])
