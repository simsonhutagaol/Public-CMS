import Swal from "sweetalert2";
import axios from 'axios';
import { useEffect, useState } from "react";
// import gearLoad from "../components/assets/Gear-0.2s-264px.svg"
import avatar from "../components/assets/avatar.gif"

export default function Categories({ urlCategory }) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const token = localStorage.token

    async function fetchCategories() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${urlCategory}/apis/branded-things/categories`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(data.data);
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: error.response.data.error,
            });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <>
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="category-section">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">Categories</h1>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Name</th>
                                </tr>
                            </thead>
                            <tbody id="table-category">
                                {loading ? (
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            <div className="mt-32 flex justify-center items-center">
                                                <img src={avatar} alt="Loading..." width={300} />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((e, index) => (
                                        <tr key={index}>
                                            <td scope="row">{index + 1}</td>
                                            <td className="fw-bold">{e.name}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}
