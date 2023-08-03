import { createContext, useEffect, useState } from "react";
import CartItem from "../components/cart-item/cart-item.component";

const addCartItems = (cartItems, productToAdd) => {
    //find if item exists
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
    //if found, increment
    
    //return new array with modified cart items
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem);
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalCartItems: () => {},
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0 );
        setCartCount(newCartCount);
    }, [cartItems]);
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    };

    // const totalCartItems = (cartItems) => {
    //     const initialValue = 0;
    //     if(cartItems.length < 1) {
    //         return 0;
    //     }
    //     return cartItems.reduce((total, currentItem) => total + currentItem.quantity, initialValue );
    // }
    
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartCount};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}