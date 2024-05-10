
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import FormProduct from '../components/productForm';
import Swal from 'sweetalert2';

export default function FormEdit({ url }) {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()
    const token = localStorage.token

    async function fetchProduct() {
        try {
            const { data } = await axios.get(`${url}/apis/pub/branded-things/products/${id}`)
            setProduct(data.data)
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
        e.preventDefault()
        try {
            const body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId }
            console.log(body)

            await axios.put(`${url}/apis/branded-things/products/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            Swal.fire({
                icon: "success",
                title: "Success edit product"
            })

            navigate('/home')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }

    return (
        <>
            <FormProduct url={url} handleSubmit={handleSubmit} product={product} nameProp="Edit Product" />
        </>
    )
}