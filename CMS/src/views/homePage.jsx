import Swal from "sweetalert2";
import axios from 'axios';
import { useEffect, useState } from "react";
// import gearLoad from "../components/assets/Gear-0.2s-264px.svg"
import avatar from "../components/assets/avatar.gif"
import { Link, useNavigate } from "react-router-dom";
export default function Home({ urlProduct }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const token = localStorage.token
    const navigate = useNavigate()
    function handleClickImage(id) {
        navigate(`/image/${id}`)
    }
    function handleClickEditProduct(id) {
        navigate(`/edit/${id}`)
    }
    async function handleClickDelete(id) {
        try {
            setLoading(true)
            await axios.delete(`${urlProduct}/apis/branded-things/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const filter = products.filter((el) => el.id !== id)
            setProducts(filter)
            Swal.fire({
                icon: "success",
                title: `Product id: ${id} deleted successfully`
            })
            navigate(`/home`)
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: err.response.data.error,
            });
        } finally {
            setLoading(false)
        }

    }
    async function fetchProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${urlProduct}/apis/branded-things/products`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(data.data);
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
    function rupiah(number) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <>
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="product-section">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">Products</h1>
                    <Link to="/add" className="btn btn-primary rounded-pill" id="new-product" >AddProduct</Link>
                </div>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col" width="180px">Image</th>
                                    <th scope="col" width="250px">Description</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Author</th>
                                    <th scope="col" width="50px"></th>
                                </tr>
                            </thead>
                            <tbody id="table-product">
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            <img src={avatar} alt="Loading..." width={300} />
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((e, index) => (
                                        <tr key={e.id}>
                                            <td scope="row">{index + 1}</td>
                                            <td className="fw-bold">{e.name}</td>
                                            <td>
                                                <img src={e.imgUrl} alt={e.name} className="img-fluid" />
                                            </td>
                                            <td>{e.description}</td>
                                            <td>{e.stock}</td>
                                            <td className="fw-bold">{rupiah(e.price)}</td>
                                            <td>{e.User.email}</td>
                                            <td>
                                                <span className="d-flex">
                                                    <a role="button" onClick={() => handleClickDelete(e.id)} className="ms-3"><span className="icon material-symbols-outlined text-danger">delete</span></a>
                                                    <a role="button" onClick={() => handleClickEditProduct(e.id)} className="ms-3"><span className="icon material-symbols-outlined text-danger">edit</span></a>
                                                    <a role="button" onClick={() => handleClickImage(e.id)} className="ms-3"><span className="icon material-symbols-outlined text-danger">image</span></a>
                                                </span>
                                            </td>
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
