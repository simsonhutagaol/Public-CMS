import Swal from "sweetalert2";
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login({ url }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault();
        try {
            let { data } = await axios.post(`${url}/apis/login`, { email, password });
            localStorage.setItem("token", data.data.access_token);
            navigate('/home')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Login failed",
                text: error.response.data.error
            })
        }
    }

    return (
        <>
            <section className="container" id="login-section">
                <div className=" my-5">
                    <div className="p-5 text-left">
                        <div className="form-signin m-auto position-center">
                            <form id="login-form">
                                <h1 className="h3 mb-3 display-1">Log in to your account</h1>
                                <span>Log in on your profile to autocomplete your purchase order
                                    with your personal data.</span>
                                <div className="mb-3 mt-3">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="login-email">Email</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input type="email" className="form-control" id="login-email" name="email" autoComplete="username" placeholder="Enter email address ..."
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="login-password">Password</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input type="password" className="form-control" id="login-password" name="password" autoComplete="current-password" placeholder="Enter your password ..."
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="checkbox mb-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="login-remember" />
                                        <label className="form-check-label" htmlFor="login-remember">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary rounded-pill w-100 p-2" onClick={handleLogin}>
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
