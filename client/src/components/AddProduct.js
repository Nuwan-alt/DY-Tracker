import React from 'react';
import './css/addProduct.css';
import {useState} from "react";
import Axios from "axios";

export default function AddProduct(){

    const [title, setTitle] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("other");
    const [s_email, setS_email] = useState("");
    const [photo, setPhoto] = useState({});
    const [link, setLink] = useState("");
    let lk;

    const uploadImage =() =>{ 
        
        const formData = new FormData()
        formData.append("file",photo)
        formData.append("upload_preset","kksl0qyy");

        Axios.post("https://api.cloudinary.com/v1_1/nuwan-j/image/upload",formData).
        then((reponse) =>{
            // setLink(reponse['data']['secure_url']);
            
            lk = reponse['data']['secure_url'];


            
        })

        console.log("image added");    
    };


    const checkUserInputs =()=>{
        if (title=="" || quantity==0 || price=="" ||s_email == ""){
            
            alert("All items must be filled")
        }else{
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            console.log(s_email)
            if(regex.test(s_email)){
                
                    uploadImage();

                    setTimeout(sendProduct,5000);
                
                    
                
            }else{
                alert("You have entered an invalid email address!")
            }
        }
    }
// ====================
    

    const sendProduct =() =>{
        
            Axios.post('http://localhost:5000/new',{
            
            title:title,
            quantity:quantity,
            price:price,
            category:category,
            s_email:s_email,
            link:lk,
            }).then(() => {
                
                alert("Item Added");
                window.location.reload(false);
                
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
                    <input type="text" required onChange={(event) => setTitle(event.target.value)}/ >

                    <label >Quantity</label>
                    <input type="number" required onChange={(event) => setQuantity(event.target.value)} />

                    <label >Price</label>
                    <input type="text" required onChange={(event) => setPrice(event.target.value)}/>

                    <label>Category</label>
                    <select onChange={(event) => setCategory(event.target.value)}>
                        <option value="other">Other</option>
                        <option value="fruit">Fruit</option>
                        <option value="veg">Vegetable</option>
                        <option value="bakery">Bakery</option>
                    </select>

                    <label >Upload a Image</label>
                    <input type="file" required onChange={(event) => {
                        
                        setPhoto(event.target.files[0])
                        
                    }}/>

                    <label >Confirm Order</label>
                    <input type="email" required onChange={(event) => setS_email(event.target.value)} placeholder="enter your email"/>
                    {/* <button onClick={sendProduct}> Add Product </button> */}
                    <button onClick={checkUserInputs}> Add Product </button>
                </div>
       
            </div>
        </div>
        
    );
}
