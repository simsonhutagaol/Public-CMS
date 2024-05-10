import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import gearLoad from '../components/assets/Gear-0.2s-264px.svg'
import Swal from "sweetalert2";
export default function Detail({ url }) {
    const navigate = useNavigate()
    const [product, setProduct] = useState("")
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    function handleClick() {
        navigate(`/`)
    }
    async function fetchProduct() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/apis/pub/branded-things/products/${id}`);
            setProduct(data.data);
            // console.log(product)
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: error.response.data.error,
            });
            navigate('/')
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
        fetchProduct();
    }, [])
    return (
        <>
            {loading ? (
                <>
                    <div className="mt-32 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                </>
            ) : (
                <>
                    <div className="p-40  rounded-xl">
                        <div className="flex flex-row">
                            <img
                                src={product.imgUrl}
                                alt="product image"
                                className="w-70 h-64 rounded-xl mr-8"
                            />
                            <div className="flex flex-col justify-between">
                                <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
                                <p className="text-gray-700 mb-6">{product.description}</p>
                                <div className="flex flex-col mb-6 ">
                                    <h3 className="font-semibold">Price:</h3>
                                    <b className="tabular-nums">{rupiah(product.price)}</b>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <h3 className="font-semibold">Stock:</h3>
                                    <b className="tabular-nums">{product.stock}</b>
                                </div>
                                <a onClick={() => handleClick()} className="self-end">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600">
                                        Back
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>



                </>
            )}
        </>
    )
}