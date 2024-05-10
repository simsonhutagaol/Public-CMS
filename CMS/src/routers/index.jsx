import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Login from "../views/loginPage";
import Home from "../views/homePage";
import Categories from "../views/categoriesPage";
import Register from "../views/registerPage";
import UpdateImage from "../views/updateImagePage";
import FormProduct from "../views/editPage";
import AddProduct from "../views/addPage"
import Swal from "sweetalert2";
import FormEdit from "../views/editPage";
const url = 'https://phase2-aio.vercel.app'
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login url={url} />,
        loader: () => {
            if (localStorage.token) {
                Swal.fire({
                    icon: "error",
                    title: `You already logged in`
                })
                return redirect('/home')
            }

            return null
        }
    },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.token) {
                Swal.fire({
                    icon: "error",
                    title: `Please login first`
                })
                return redirect('/')
            }

            return null
        },
        children: [
            {
                path: "/home",
                element: <Home urlProduct={url} />,
            },
            {
                path: "/categories",
                element: <Categories urlCategory={url} />,
            },
            {
                path: "/register",
                element: <Register urlRegister={url} />,
            },
            {
                path: "/add",
                element: <AddProduct url={url} />,
            },
            {
                path: "/edit/:id",
                element: <FormEdit url={url} />,
            },
            {
                path: "/image/:id",
                element: <UpdateImage urlImage={url} />,
            },
            {
                path: "/formProduct/:id",
                element: <FormProduct urlProduct={url} />,
            },
        ]
    },
])
export default router