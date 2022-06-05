import React from 'react';
import './css/addProduct.css';
import {useState} from "react";
import Axios from "axios";

export default function AddProduct(){
    const [title, setTitle] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [price, setPrice] = useState("00");
    const [category, setCategory] = useState("other");
    const [s_email, setS_email] = useState("");

    const sendProduct =() =>{
        
        Axios.post('http://localhost:5000/new',{
            title:title,
            quantity:quantity,
            price:price,
            category:category,
            s_email:s_email,
            }).then(() => {
                console.log("Done");
            })
            };

    return (
        <div>
            <div className='list' >
                <div>
                    <h1 className='title'>Add Product</h1>
                </div>

                <div className='information'>
                    <label >Titlee </label>
                    <input type="text" onChange={(event) => setTitle(event.target.value)}/>

                    <label >Quantity</label>
                    <input type="number" onChange={(event) => setQuantity(event.target.value)} />

                    <label >Price</label>
                    <input type="text" onChange={(event) => setPrice(event.target.value)}/>

                    


                    <label>Category</label>
                    <select onChange={(event) => setCategory(event.target.value)}>
                        <option value="other">Other</option>
                        <option value="fruit">Fruit</option>
                        <option value="veg">Vegetable</option>
                        <option value="bakery">Bakery</option>
                    </select>

                    <label >Confirm Order</label>
                    <input type="text" onChange={(event) => setS_email(event.target.value)} placeholder="enter your email"/>
                    <button onClick={sendProduct}> Add Product </button>
                </div>
       
            </div>
        </div>
        
    );
}
