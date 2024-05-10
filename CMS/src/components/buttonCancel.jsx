
import { useNavigate } from "react-router-dom"
export default function ButtonCancel() {
    const navigate = useNavigate()
    function handleClick() {
        navigate('/home')
    }
    return (
        <>
            <button className="btn btn-lg btn-light rounded-pill w-100 p-2 mt-3" onClick={handleClick}>Cancel</button>
        </>
    )
}