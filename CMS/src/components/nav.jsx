
import { Link, useNavigate } from "react-router-dom"
export default function Nav() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" id="sidebar-menu">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link" href="" id="nav-product"> Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categories" className="nav-link" href="" id="nav-category">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link" href="" id="nav-category"> Add User</Link>
                        </li>
                    </ul>
                    <h6
                        className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                        <span>Account</span>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        {/* <li className="nav-item">
                            <a className="nav-link">Hej, <span
                                id="username">Hacktiv8!</span></a>
                        </li> */}
                        <li className="nav-item">
                            <Link onClick={handleLogout} className="nav-link" href="" id="nav-logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}