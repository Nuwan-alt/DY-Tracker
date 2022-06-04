import React from 'react';
import './css/viewProduct.css';
import {useState} from "react";
import Axios from "axios";

export default function ViewProducts(){
    
    const [category, setCategory] = useState("other");
    const [productList,setProductList] = useState([]);


    const recieveProduct =() =>{
        
        Axios.get('http://localhost:5000/products').then((products) => {
            setProductList(products.data);    
            console.log(products.data);
            })
    };

    const recieveProductByCategory =() =>{
        
        Axios.get('http://localhost:5000/products/'+category).then((products) => {
            setProductList(products.data); 
            console.log(products.data);
            })
    };

            return (
        <div>
            <div className='list'>
                <div> 
                    <h1 className='title'> View Produts </h1>
                </div>

                <div className='productList'>
                    <button onClick={recieveProduct}> Check all Produts</button>
                    
                    

                    <button onClick={recieveProductByCategory}> Check Produts By Category</button>
                        
                        <label>Category</label>
                        <select onChange={(event) => setCategory(event.target.value)}>
                            <option value="other">Other</option>
                            <option value="fruit">Fruit</option>
                            <option value="veg">Vegetable</option>
                            <option value="bakery">Bakery</option>  
                        </select>
                    
                </div>
                
                
                <div className='grid'>
                    { productList.map((val,key) => {
                        return (
                        
                            <div className='setInVar'>
                               <span> TITLE :</span>  {val.title}
                               <br/>
                               <span>PRICE : </span> {val.price}
                               <br/>
                               <span>CATEGORY : </span> {val.category}
                                <br/>
                               <button >DELETE</button>
                            </div>
                       
                        )
                     })}
                </div>

                
                
                
               
            </div>
            
        </div>
        
    );
}
