import { useContext, useState , useEffect } from "react";
import { CartContext } from "./CartContext";


function CartItem ({ id, quantity }) {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let totalPrice = 0;
    useEffect( () => {
        const fetchData = async () => {
            try{
                const reponse = await fetch(`https://fakestoreapi.com/products/${id}`);
                const json = await reponse.json();
                setData(json);
            }
            catch(err){
                console.log(err);
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

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>ERROR! Try again later.</div>
    }

    totalPrice = parseFloat(data.price) * quantity;
    return (
        <div className="cartitem-cont">
            <img height={50}  src={data.image} />
            <div className="cartitem-title">{data.title}</div>
            <div className="cartitem-price">{'$' + data.price}</div>
            <div className="cartitem-quantity">{quantity + 'pc'}</div>
            <div className="cartitem-total">{'$' + totalPrice}</div>
        </div>
    )
}

export default CartItem;