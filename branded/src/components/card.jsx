import { useNavigate } from "react-router-dom";
export default function Card({ product }) {
    const navigate = useNavigate()
    function handleClick(id) {
        navigate(`/detail/${id}`)
    }
    function rupiah(number) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    return (
        <>
            <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-100">
                <img className="w-full h-[300px] object-cover" src={product.imgUrl} alt="product image" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <div className="text-gray-700 text-base">
                        <h3 className="inline-block">Price: </h3>
                        <b className="tabular-nums">{rupiah(product.price)}</b>
                    </div>
                    <div className="text-gray-700 text-base">
                        <h3 className="inline-block">Stock: </h3>
                        <b className="tabular-nums">{product.stock}</b>
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <button onClick={() => handleClick(product.id)} className="btn btn-info">
                        Detail
                    </button>
                </div>
            </div>
        </>
    )
}