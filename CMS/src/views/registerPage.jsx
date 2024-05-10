import Swal from "sweetalert2";
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import ButtonCancel from "../components/buttonCancel";

export default function Register({ urlRegister }) {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()
    const token = localStorage.token

    async function handleRegister(event) {
        event.preventDefault();
        try {
            await axios.post(`${urlRegister}/apis/add-user`, { username, email, password, phoneNumber, address }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/home')
            Swal.fire({
                icon: "success",
                title: "Registration successful"
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }

    return (
        <>
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-user-section">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="pt-3 pb-2 mb-3 border-bottom">
                            <form id="register-form">
                                <h1 className="h3 mb-3 display-1">Register User</h1>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <label >Username</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input type="text" className="form-control" id="register-username" name="username" autoComplete="username" placeholder="Enter username ..."
                                        onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <label >Email</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input type="email" className="form-control" id="register-email" name="email" autoComplete="email" placeholder="Enter email address ..."
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <label >Password</label>
                                        <label className="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input type="password" className="form-control" id="register-password" name="password" autoComplete="new-password" placeholder="Enter password ..."
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label >Phone Number</label>
                                    <input type="text" className="form-control" id="register-phone" name="phoneNumber" autoComplete="tel" // Perbaikan
                                        placeholder="Enter phone number (optional) ..." onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label >Address</label>
                                    <textarea id="register-address" className="form-control" rows="3" name="address" autoComplete="street-address" // Perbaikan
                                        placeholder="Enter address (optional) ..." onChange={(e) => setAddress(e.target.value)} ></textarea>
                                </div>
                                <button className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3" onClick={handleRegister}>Sign Up</button>
                                <ButtonCancel />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
