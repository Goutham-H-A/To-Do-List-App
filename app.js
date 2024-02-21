const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + "/date.js"); 

const app = express();
app.set("view engine","ejs"); //To run ejs
app.use(bodyParser.urlencoded({extended:true})); //using body parser module
app.use(express.static("public")); //setting static files public to use all files like css ect..

 mongoose.connect('mongodb:/127.0.0.1:27017/todolistDB'); //cconnect to database

const itemsSchema = new mongoose.Schema({
    name: String
  });

  const Item = new mongoose.model('Item', itemsSchema);

  const item1 = new Item({ name: 'Wake UP' }); //creating three items
  const item2 = new Item({ name: 'Drink Water' });
  const item3 = new Item({ name: 'Exercise' });

  const defaultList = [item1,item2,item3]; //storing it in an array of default items
  
  app.get("/", async function(req, res) {
    try {
      const day = date.getDate(); // Getting date from date.js module
  
      // Use async/await to wait for the result of the find operation
      const foundItems = await Item.find({});
  
      if (foundItems.length === 0) {
        // Insert defaultList if no items are found
        await Item.insertMany(defaultList);
        console.log('Default items inserted successfully.');
      }
  
      // Render the list whether it was initially empty or not
      res.render("list", { kindOfDay: day, newItems: foundItems });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error'); // Adjust the status and message as needed
    }
  });
  
app.post("/",function(req,res){
    const item =req.body.newItems;
    console.log(item);
    const enterItem = new Item ({
      name:item
    });
    enterItem.save();
    res.redirect("/");
});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  console.log(checkedItemId);
  // Assuming you have defined your Item model using mongoose.Schema

Item.findByIdAndDelete(checkedItemId)
.then((deletedItem) => {
  if (deletedItem) {
    console.log("Successfully deleted the item with ID: " + checkedItemId);
  } else {
    console.error("Item not found with ID: " + checkedItemId);
  }
  // Redirect to the root route after deletion
  res.redirect("/");
})
.catch((err) => {
  console.error("Error deleting item with ID: " + checkedItemId);
  // Handle other errors if needed
  res.redirect("/"); // Redirect in case of an error
});
});
app.listen(3000,function(){
  console.log("Server started at port 3000");
});