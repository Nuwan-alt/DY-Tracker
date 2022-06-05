import React from 'react';
import './css/viewUsers.css';
import {useState} from "react";
import Axios from "axios";

export default function ViewUsers(){
    
    const [userList,setUserList] = useState([]);
    const [role, setRole] = useState("Users");

    const recieveUsersByRole =() =>{
        let showRole = setRoleOut(role);
        if(showRole == "Users"){
            setUserList([]);
            return;
        } 
        Axios.get('http://localhost:5000/users/'+showRole).then((users) => {
            setUserList(users.data); 
            console.log(users.data);
            })
    };

    
    



            return (
        <div>
            <div className='list'>
                <div> 
                    <h1 className='title'> View {role} </h1>
                </div>

                <div className='productList'>
                    

                    
                        
                        <label>Role</label>
                        <select onChange={(event) => setRole(event.target.value)}>
                            <option value="Users">Select A Role</option>
                            <option value="Customers">Customers</option>
                            <option value="Sellers">Sellers</option>
                            <option value="Admin Panel">Admins</option>     
                        </select>

                        <button onClick={recieveUsersByRole}> Check Users By Role</button>
                    
                </div>
                
                
                <div className='grid'>
                    { userList.map((val,key) => {
                        return (
                        
                            <div className='setInVar'>
                               <span> NAME :</span>  {val.firstName}
                               <br/>
                               <span>EMAIL : </span> {val.email}
                               <br/>
                               <span>CONATACT NUMBER : </span> {val.contactNum}
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

function setRoleOut(role){
    switch(role){
        case "Customers":
            return "customers";
        case "Sellers":
            return "sellers";
        case "Admin Panel":
            return "admin";
        case "Users":
            return "Users";
    }
}
