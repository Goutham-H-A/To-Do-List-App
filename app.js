const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items =['Wakeup','Drink water','Do Exercise']; // array of list items

app.set("view engine","ejs"); //To run ejs

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public")); //setting static files public to use all files like css ect..

app.listen(3000,function(){
    console.log("Server started at port 3000");
});

app.get("/",function(req,res){
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let today  = new Date();
    
    let day= today.toLocaleDateString("en-US",options); //javascript method to get date and format

    res.render("list",{kindOfDay:day,newItems:items}); // passing the day to list.ejs 
    
});

app.post("/",function(req,res){
    let item =req.body.newItem;
    items.push(item); //pushing the new item to items array
    
    res.redirect("/");
});

