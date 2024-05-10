import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from '../views/BaseLayout'
import Home from '../views/home'
import Detail from '../views/detail'
const url = 'https://phase2-aio.vercel.app'
const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <Home url={url} />,
            },
            {
                path: "/detail/:id",
                element: <Detail url={url} />,
            },
        ]
    },
])
export default router