import axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import ButtonCancel from '../components/buttonCancel';
export default function UpdateImage({ urlImage }) {
    const [product, setProduct] = useState([])
    const fileRef = useRef(null);
    const { id } = useParams()
    const token = localStorage.token
    const navigate = useNavigate()

    async function fetchData() {
        try {

            const { data } = await axios.get(`${urlImage}/apis/branded-things/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProduct(data.data)
            console.log(data.data, 'masuk koncet')
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: err.response.data.error,
            });
        }
    }
    async function handleClick(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', fileRef.current.files[0]);
        try {
            const data = await axios.patch(`${urlImage}/apis/branded-things/products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
            })
            Swal.fire({
                icon: "success",
                title: `Product id: ${id} Update Image successfully`
            })
            navigate('/home')
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: err.response.data.error,
            });
        }
    }
    useEffect(() => {
        fetchData()
        // console.log(product, 'masuk')
    }, [])
    return (
        <>
            <section className=" ms-sm-auto col-lg-10 px-md-4" id="update-product-section">
                <div className="row">
                    <div className="pt-3  text-center ">
                        <img className='m-2 rounded-5' src={product.imgUrl} alt="" width="300" />
                    </div>
                    <div className="pt-3 pb-2 mb-3">
                        <form id="register-form" onSubmit={handleClick} >
                            <h1 className="h3 mb-3 display-1">Update Image Product : {product.name}</h1>
                            <div className="mb-3">
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control pb-2" id="inputGroupFile02" ref={fileRef} />
                                </div>
                                <button className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"  >Update Image</button>
                                <ButtonCancel />
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}