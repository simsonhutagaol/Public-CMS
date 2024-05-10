import Card from "../components/card"
import axios from 'axios';
import gearLoad from "../components/assets/Gear-0.2s-264px.svg"
import { useEffect, useState } from "react";
export default function Home({ url }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('ASC')
    const [filter, setFilter] = useState('')
    const [categories, setCategories] = useState([])
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    async function fetchProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/apis/pub/branded-things/products?q=${search}&i=${filter}&limit=10&page=${page}&sort=${sort}`);
            const categori = await axios.get(`${url}/apis/pub/branded-things/categories`)
            setProducts(data.data.query);
            setPagination(data.data.pagination.totalPage)
            setCategories(categori.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [search, sort, filter, page])
    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center m-5 gap-5">

                <div className="flex flex-col md:flex-row md:space-x-2 items-center">
                    <span className="font-medium text-gray-600 text-black">Filter by:</span>
                    <select className="form-select" name="filter" onChange={(e) => setFilter(e.target.value)}>
                        <option value={''}>Categories...</option>
                        {categories.map(c => {
                            return <option key={c.id} value={c.name}>{c.name}</option>
                        })}
                    </select>
                </div>
                <p>|</p>
                <div className="flex flex-col md:flex-row md:space-x-2 items-center">
                    <span className="font-medium text-gray-600 text-black">Sort by:</span>
                    <select className="form-select" name="sort" onChange={(e) => setSort(e.target.value)}>
                        <option value="ASC">longest</option>
                        <option value="DESC">latest</option>
                    </select>
                </div>
                <p>|</p>
                <form action="" method="get" className="flex flex-col md:flex-row md:space-x-2 items-center">
                    <span className="font-medium text-gray-600 text-black">Search:</span>
                    <div className="form-control">
                        <input type="search" placeholder="Search..." className="input input-bordered w-24 md:w-auto" name="search" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </form>
            </div>
            {
                loading ? (
                    <div className="mt-32 flex justify-center items-center" >
                        <img src={gearLoad} />
                    </div>
                ) : (
                    <div id="PAGE-HOME" className="p-3 ">
                        <main className="grid  md:grid-cols-4 gap-5 my-8 text-black px-10">
                            {products.map(product => {
                                return <Card key={product.id} product={product} />
                            })}
                        </main>
                    </div>
                )
            }

            <div className=" flex justify-center items-center">
                <span className="font-medium text-gray-600 text-black">Page:</span>
                {[...Array(pagination)].map((x, i) =>
                    <button className="m-1 btn" onClick={() => setPage(i + 1)} key={i}>{i + 1}</button>
                )}
            </div>
            <p>|</p>

        </>
    )
}