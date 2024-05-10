import { Outlet } from "react-router-dom"
import Nav from "../components/nav"
import Header from "../components/header"
export default function BaseLayout() {
    return (
        <>
            <Header />
            <Nav />
            <Outlet />
        </>
    )
}