const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js"); 

const app = express();

const items =['Wakeup','Drink water','Do Exercise']; // array of list items

app.set("view engine","ejs"); //To run ejs

app.use(bodyParser.urlencoded({extended:true})); //using body parser module
app.use(express.static("public")); //setting static files public to use all files like css ect..

app.listen(3000,function(){
    console.log("Server started at port 3000");
});

app.get("/",function(req,res){
    
    const day = date.getDate(); //getting date from date.js module

    res.render("list",{kindOfDay:day,newItems:items}); // passing the day to list.ejs 
    
});

app.post("/",function(req,res){
    const item =req.body.newItem;
    items.push(item); //pushing the new item to items array
    
    res.redirect("/");
});

