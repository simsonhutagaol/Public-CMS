import FormProduct from "../components/productForm"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
export default function AddProduct({ url }) {
    const navigate = useNavigate()
    async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
        e.preventDefault()
        try {
            const body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId }

            const { data } = await axios.post(`${url}/apis/branded-things/products`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            Swal.fire({
                icon: "success",
                title: `Success add new product ${name}`
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
            <FormProduct url={url} handleSubmit={handleSubmit} nameProp="Add Product" />
        </>
    )
}