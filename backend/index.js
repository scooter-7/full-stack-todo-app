const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(cors("*"));

const TodoModel = require("./model/Todo");


const connectionString = "mongodb+srv://sarahcotter:learningtodo@cluster0.9t8y5.mongodb.net/todoDB";

mongoose
    .connect(connectionString)
    .then(() => {
        console.log("Connected to the database");
        app.listen(3000, function() {
        console.log("server running at port 3000");
    });
})
.catch((err) => console.log(err));

//Read Method (GET)
app.get("/todos", async (req,res) => {
   // res.send("Hello Sydney!");  
   try {
    const response = await TodoModel.find({})
    console.log(response);

    res.json(response)

   } catch (err) {
    console.log(err)
   }
});

//Create Method (POST)
app.post("/todos", async (req, res) =>{
    try {
    console.log(req.body);

    const todo = req.body;
    
    const newItem = await TodoModel.create(todo);

    //res.send("Your post method is working")
    res.status(200).send("successful")

    } catch (error) {
      console.log(error);  
      res.status(500).send("Server Error")
    }
})

//Delete Method 
app.delete("/todos/:id", async (req, res) => {
    try {
     let id = req.params.id;
     
     console.log(id);
     const deletedItem = await TodoModel.deleteOne({
        _id: id
     });

     res.status(200).send("Delete Successful")

    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error")
    }
})

//Update Method (PUT)
app.put("/todos/:id", async(req, res, ) => {
  try {
    const id = req.params.id;
    console.log(id);

    const { text } = req.body;
   
    const updateOptions = {text: text};
    const updateItem = await TodoModel.findByIdAndUpdate(id, updateOptions);

    res.status(200).send("Updated item")

  } catch (errors) {
    console.log(error);
    res.status(500).send("Server Error");
  }

})

