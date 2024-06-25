import { useNavigate } from "react-router-dom";
import '../styles/item.css'

function ErrorPage() {
    const navigate = useNavigate();
    function handleClick () {
        navigate('/');
    }
    return (
        <div className="error" onClick={handleClick}>You messed up somewhere. Return to Spawn?</div>
    )
}

export default ErrorPage;