import { useEffect, useState } from "react";
import '../styles/item.css';
import { useNavigate } from "react-router-dom";

function Item({ id }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        const fetchData = async () => {
            try{
                const reponse = await fetch(`https://fakestoreapi.com/products/${id}`);
                const json = await reponse.json();
                setData(json);
            }
            catch{
                setError(true);
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    function truncateString(str) {
        if (str.length > 50) {
          return str.slice(0, 50) + '...';
        }
        return str;
    }

    function capitalizeFirstLetter(str) {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function handleItemClick() {
        navigate(`/product/${id}`);
    }

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>ERROR! Try again later.</div>
    }

    return (
        <div className="item-container" onClick={handleItemClick}>
            <img height={200} width={200} src={data.image}></img>
            <div className="item-title">{truncateString(data.title)}</div>
            <div className="item-info">
                <div className="item-category">{capitalizeFirstLetter(data.category)}</div>
                <div className="item-price">{'$'+data.price}</div>
            </div>
        </div>
    )
}

export default Item;