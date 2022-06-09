const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const { type, status } = require("express/lib/response");
const multer = require('multer');
const util = require('util');
const upload = require("express-fileupload");

const app = express();
app.use(express.json());
app.use(cors());
app.use(upload());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//create db connection
const db = mariadb.createPool({
    user: "root",
    host: "localhost",
    password: "maria",
    database: "dy-tracker",
});


app.get('/',(req,res) =>{
    res.send("I'm connected");
})


// ======================= add new product ==============================================

app.post('/new', async (req,res) => {
    // console.log(req.file);
    
    const URL =req.body.link;
    const title = req.body.title;
    console.log("title:"+title);
    const quantity = req.body.quantity;
    const price = req.body.price;
    const category = req.body.category ;
    const s_email = req.body.s_email;
    
    if (title == null || quantity == null || price==null || s_email==null || URL==null  ){
        console.log("can't be empty");
    }
    

    try {
        const result = await db.query(
            "INSERT INTO products (title, quantity , price,category,s_email,url) VALUES(?,?,?,?,?,?)",
            [title,quantity,price,category,s_email,URL]
        );
        res.send("data inserted");
    } catch (err) {
        throw err;
    }

})

// ======================== get all products =============================================
app.get('/productsBySeller/:email',async (req,res) =>{
    const email = req.params.email;
    
    try {
        const result = await db.query(
            "SELECT * FROM products where s_email =?",[email]
            
        );
        if( result == null){
            res.send("No data");
        }else{
            res.send(result);
        }
       
    } catch (err) {
        throw err;
    }
})

// ============================= get product by category ===============================
app.get('/productsBySeller/:email/:category',async (req,res) =>{
    
    if (req.params.email == "" || req.params.category==null){
        res.send("invalid request");
    }else{
        const email = req.params.email;
        const category = req.params.category;
    
    try {
        
        const result = await db.query(
            'SELECT * FROM products WHERE category = ? AND s_email = ?',
            [category,email]
            
        );
        res.send(result);
        // if( result.length == 0){
        //     res.send("No data");
        // }else{
        //     res.send(result );
        // }
       
    } catch (err) {
        throw err;
    }
}
})

//============================ get all users by type ===============================================
app.get('/users/:type',async (req,res) =>{
    const type = req.params.type;
    try {
        const result = await db.query(
            "SELECT * FROM "+ type
            
        );
        if( result.length == 0){
            res.send("No data");
        }else{
            res.send(result);
        }
       
    } catch (err) {
        throw err;
    }
})



//============================ add user by type =========================================
app.post('/add/:type',async (req,res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contactNum = req.body.contactNum;
    const type = req.params.type;
    

    if (firstName == null || lastName == null || email == null || contactNum == null){
        res.send("data can't be empty");
    }else{
        try {
           
            const result = await db.query(
                "INSERT INTO "+type+ " (firstName, lastName , email, contactNum) VALUES(?,?,?,?)",
                [firstName,lastName,email,contactNum]
            );
            res.send("Data Inserted");
        } catch (err) {
            throw err;
        }
    }
    
})

//============================== Add Admin =======================================
app.post('/add_admin',async (req,res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contactNum = req.body.contactNum;
    
    

    if (firstName == null || lastName == null || email == null || contactNum == null){
        res.send("data can't be empty");
    }else{
        try {
           
            const result = await db.query(
                "INSERT INTO admin (firstName, lastName , email, contactNum) VALUES(?,?,?,?)",
                [firstName,lastName,email,contactNum]
            );
            res.send("Data Inserted");
        } catch (err) {
            throw err;
        }
    }
    
})
// =======================Delete a User ======================================

app.delete('/del_product/:id',async (req,res) =>{
    console.log("maria Db");
    const id = req.params.id;
    const query = 'DELETE FROM products WHERE p_id = ?';

    try {
           
        const result = await db.query(
            query,
            [id]
        );
        res.send("Item Deleted");
    } catch (err) {
        throw err;
    }

})


//======================== make a user as a admin ========= **** add user admin table======

app.put('/make_admin/:id',async (req,res) =>{
    const id = req.params.userName;
    if(userName == null){
        res.send("No user exist with username:" + userName);
    }else{
        
        try {
            const result = await db.query(
                "UPDATE users SET status = 'admin' WHERE username = ?",
                [userName]
            );
            res.send("user updated.");
        } catch (err) {
            throw err;
        }
    }
    
 
    
    
})




// start the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));


