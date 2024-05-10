import { Outlet } from "react-router-dom"
import Nav from "../components/nav"
export default function BaseLayout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}