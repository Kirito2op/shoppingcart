import { useContext, useState , useEffect } from "react";
import { CartContext } from "./CartContext";
import CartItem from "./CartItem";

function Cart() {
    const { cartItems, setCartItems } = useContext(CartContext);

    return (
        <div className="cart-cont">
            {cartItems.map(({ id, quantity }) => (
                <CartItem id={id} quantity={quantity} key={id} />
            ))}
        </div>
    )
}

export default Cart;
