import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "./CartContext";


function ItemPage () {
    const { cartItems, setCartItems } = useContext(CartContext);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState(null);
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
    }, []);

    function capitalizeFirstLetter(str) {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleShopClick = () => {
        navigate('/shop');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddtoCart = () => {
        if(inputValue < 0){
            return;
        }
        let newCartItems = cartItems;
        const doesItemExist = cartItems.find(item => item.id === id);
        if(doesItemExist){
            doesItemExist.quantity += inputValue;
        }
        else{
            newCartItems.push({ id:id, quantity:inputValue});
        }
        setCartItems(newCartItems);
    }

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>ERROR! Try again later.</div>
    }
    return (
        <>  
            <div className="itempage-header">
                <div onClick={handleHomeClick}><svg height={50}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home-outline</title><path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22" /></svg></div>
                <div onClick={handleShopClick}>Shop</div>
                <div onClick={handleCartClick}><svg width={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cart-variant</title><path d="M19 20C19 21.11 18.11 22 17 22C15.89 22 15 21.1 15 20C15 18.89 15.89 18 17 18C18.11 18 19 18.9 19 20M7 18C5.89 18 5 18.89 5 20C5 21.1 5.89 22 7 22C8.11 22 9 21.11 9 20S8.11 18 7 18M7.2 14.63L7.17 14.75C7.17 14.89 7.28 15 7.42 15H19V17H7C5.89 17 5 16.1 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2H4.27L5.21 4H20C20.55 4 21 4.45 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63M8.5 11H10V9H7.56L8.5 11M11 9V11H14V9H11M14 8V6H11V8H14M17.11 9H15V11H16L17.11 9M18.78 6H15V8H17.67L18.78 6M6.14 6L7.08 8H10V6H6.14Z" /></svg></div>
            </div>
            <div className="itempage">
                <div><img src={data.image} height={590}/></div>
                <div className="item-right">
                    <div className="itempage-title">{data.title}</div>
                    <div className="itempage-info">
                        <div className="itempage-price">{'$'+ data.price}</div>
                        <div className="itempage-cat">{capitalizeFirstLetter(data.category)}</div>
                    </div>
                    <div className="itempage-desc">{data.description}</div>
                    <input onChange={handleChange} className="itempage-input" type="number" min={0} max={30}></input>
                    <button className="itempage-button" onClick={handleAddtoCart}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}

export default ItemPage;