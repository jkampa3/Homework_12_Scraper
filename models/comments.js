//required npm
var mongoose = require("mongoose");

//queue up database
var Schema = mongoose.Schema;

// create comment schema
var CommentSchema = new Schema({

    // poster's name
    poster: {
      type: String
    },
    // comment
    comment: {
      type: String
    }
    
  });
  
  
  // create the comment model with mongoose
  var Comment = mongoose.model('Comments', CommentSchema);
  
  // export the model
  module.exports = Comments;
