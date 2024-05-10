import { useState, useEffect } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import ButtonCancel from "./buttonCancel";
export default function FormProduct({ url, handleSubmit, product, nameProp }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (product) {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setImgUrl(product.imgUrl)
            setStock(product.stock)
            setCategoryId(product.categoryId)
        }
    }, [product])
    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${url}/apis/pub/branded-things/categories`)
            console.log(data, 'mauskk')
            setCategories(data.data)
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            })
        }
    }
    useEffect(() => {
        fetchCategories();
    }, [])
    return (
        <>
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">Form Product</h1>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <form id="product-form" onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)}>
                            <div className="mb-3">
                                <label for="product-name">Name <span className="text-danger fw-bold">*</span></label>
                                <input type="text" className="form-control" id="product-name" placeholder="Enter product name" value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label for="product-category">Category <span className="text-danger fw-bold">*</span></label>
                                <select id="product-category" className="form-select" onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
                                    <option value="" selected disabled>-- Select Category --</option>
                                    {categories.map(c => {
                                        return <option key={c.id} value={c.id}>{c.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="product-desc">Description <span className="text-danger fw-bold">*</span></label>
                                <input type="text" className="form-control" id="product-desc" placeholder="Enter product description"
                                    onChange={(e) => setDescription(e.target.value)} value={description} />
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label for="product-stock">Stock <span className="text-danger fw-bold">*</span></label>
                                        <input type="number" min="0" className="form-control" id="product-stock"
                                            placeholder="Enter product stock" onChange={(e) => setStock(e.target.value)} value={stock} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label for="product-price">Price <span className="text-danger fw-bold">*</span></label>
                                        <input type="number" min="0" className="form-control" id="product-price"
                                            placeholder="Enter product price" onChange={(e) => setPrice(e.target.value)} value={price} />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="product-image">Image</label>
                                <input type="text" className="form-control" id="product-image" placeholder="Enter product image url"
                                    onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
                            </div>
                            <div className="row mt-5 mb-3">
                                <button className="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit" href="">{nameProp}</button>
                                <ButtonCancel />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}