import React from 'react';
import './css/addAdmin.css';
import {useState} from "react";
import Axios from "axios";

export default function AddAdmin(){
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNum, setContactNum] = useState("");

    const sendProduct =() =>{
        
        Axios.post('http://localhost:5000/add_admin',{
            firstName:firstName,
            lastName:lastName,
            email:email,
            contactNum:contactNum,
            }).then(() => {
                console.log("Done");
            })
            };

    return (
        <div>
            <div className='list' >
                <div>
                    <h1 className='title'>Add Admin</h1>
                </div>

                <div className='information'>
                    <label >Lirst Name </label>
                    <input type="text" onChange={(event) => setFirstName(event.target.value)}/>

                    <label >Last Name</label>
                    <input type="test" onChange={(event) => setLastName(event.target.value)} />

                    <label >Email</label>
                    <input type="text" onChange={(event) => setEmail(event.target.value)}/>

                    <label >Contact Number</label>
                    <input type="text" onChange={(event) => setContactNum(event.target.value)}/>

                    <button onClick={sendProduct}> Add Admin </button>
                </div>

                
                    
            </div>
        </div>
        
    );
}
