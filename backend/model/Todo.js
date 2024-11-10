const mongoose = require("mongoose");

// schema -> structure of the database
const TodoSchema = mongoose.Schema({
    
    text: {type: String, required: true}
})

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel; 