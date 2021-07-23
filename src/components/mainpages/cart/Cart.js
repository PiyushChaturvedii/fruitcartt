import React, {useState, useContext, useEffect} from 'react';
import {GlobalState} from '../../../GlobalState';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Popup from "reactjs-popup";

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])

    const addToCart = async() => {
        await axios.patch('user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCart([...cart])
        addToCart()
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart()
    }

    const removeProduct = id => {
        if(window.confirm("Do you want to delete this product")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart() 
        }
    }
    
    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart is empty</h2>
    return (
        <div>
        <center>
        <div>
                    {
            cart.map(product => (
                <div className="cart" key={product._id}>
                    <img src={product.images.url} alt="" className="img_container"/>
                    
                    <div className="box-detail">
                        <h2>{product.title}</h2>
                        <h3>&#8377;{product.price * product.quantity}</h3>
                        <p>{product.description}</p>
                        <p>{product.content}</p>
                        <div className="amount">
                            <button onClick={() => decrement(product._id)}>-</button>                            
                            <span>{product.quantity}</span>
                            <button onClick={() => increment(product._id)}>+</button>
                        </div>
                        <div className="delete" onClick={() => removeProduct(product._id)}>
                            X
                        </div>
                    </div>
                </div>                       
                ))
            }
            <div className="total">
                <h3>Total: &#8377; {total}</h3>
            </div>
            <Popup trigger={<button className="btn">Pay</button>} position="top left">
               <div className="pay">
              Your Payment is successfully done.
               </div> 
            </Popup>
            </div>
            </center>
        </div>
    )
}

export default Cart
