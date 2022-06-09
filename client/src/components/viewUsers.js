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
        console.log(users.data);
        
        if(users.data.length == 0){
            alert("No Data");
        }
        setUserList(users.data); 
         
            })

            
    };

    const handleDelete=(id)=>{
         deleteProduct(id);
         alert("Item Deleted");
         window.location.reload(false);
         
     }

     const deleteProduct =(id) =>{
        let showRole = setRoleOut(role);
        
        console.log("role:" +showRole);
        Axios.delete('http://localhost:5000/del_user/'+showRole+'/'+id).then(()=>{
            console.log("git hub");

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
                               <button  onClick={()=>{handleDelete(val.u_id)}} >DELETE</button>
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
