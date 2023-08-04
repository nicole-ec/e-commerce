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

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === productToRemove.id);

    //if quantity == 1, remove product from cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== productToRemove.id);
    }

    //return updated items
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1}: cartItem);
}

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter((item) => item.id !== productToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, currentItem) => total + (currentItem.quantity*currentItem.price), 0 );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0 );
        setCartCount(newCartCount);
    }, [cartItems]);
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear));
    };

    // const totalCartItems = (cartItems) => {
    //     const initialValue = 0;
    //     if(cartItems.length < 1) {
    //         return 0;
    //     }
    //     return cartItems.reduce((total, currentItem) => total + currentItem.quantity, initialValue );
    // }
    
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart,
        cartCount, 
        cartItems,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}