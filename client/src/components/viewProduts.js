import React from 'react';
import './css/viewProduct.css';
import {useState} from "react";
import Axios from "axios";

export default function ViewProducts(){
    
    const [category, setCategory] = useState("other");
    const [s_email, setS_email] = useState("");
    // const [p_id, setP_id] = useState("0");
    const [productList,setProductList] = useState([]);

    

    const recieveProduct =() =>{
        if(s_email == ""){
            alert("Please Enter Your email");
        }
        Axios.get('http://localhost:5000/productsBySeller/'+s_email).then((products) => {
            setProductList(products.data);    
            
            })
    };

    const handleDelete=(id)=>{
        console.log("log"+id);
         deleteProduct(id);
         alert("Item Deleted");
         window.location.reload(false);
         
     }

    const deleteProduct =(p_id) =>{
        console.log("harry Potter");
        Axios.delete('http://localhost:5000/del_product/'+p_id).then(()=>{
            console.log("harry Potter");
        })
            
           
    };



    const recieveProductByCategory =() =>{
        
        if(s_email == ""){
            alert("Please Enter Your email");
        }
        Axios.get('http://localhost:5000/productsBySeller/' + s_email + '/' + category).then((products) => {
            
        if(products.data.length == 0){
            alert("No Data");
        }
        setProductList(products.data); 

            })
    };

            return (
        <div>
            <div className='list'>
                <div> 
                    <h1 className='title'> View Produts </h1>
                </div>

                <div className='productList'>
                    <label >Confirm Your email</label>
                    <input type="text" onChange={(event) => setS_email(event.target.value)} placeholder="enter your email"/>

                    <button onClick={recieveProduct}> Check all Produts</button>
                    
                        <label>Category</label>

                        <select onChange={(event) => setCategory(event.target.value)}>
                            <option value="other">Other</option>
                            <option value="fruit">Fruit</option>
                            <option value="veg">Vegetable</option>
                            <option value="bakery">Bakery</option>  
                        </select>

                        <button onClick={recieveProductByCategory}> Check Produts By Category</button>
                    
                </div>
                
                
                <div className='grid'>
                    { productList.map((val,key) => {
                        return (
                        
                            <div className='setInVar' >
                                <img ></img>
                                
                               <span> TITLE :</span>  {val.title}
                               <br/>
                               <span>PRICE : </span> {val.price}
                               <br/>
                               <span>CATEGORY : </span> {val.category}
                                <br/>
                               <button onClick={() =>
                                   
                                   handleDelete(val.u_id)
                               }>DELETE</button>
                            </div>
                       
                        )
                     })}
                </div>

 
            </div>
            
        </div>
        
    );
}
