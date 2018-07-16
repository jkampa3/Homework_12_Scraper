//required npm
var mongoose = require("mongoose");

//queue up database
var Schema = mongoose.Schema;

//build schema
var ArticleSchema = new Schema({

    //headline
    headline: {
        type: String,
        required: true
      },
      
      //summary
      summary: {
        type: String,
        required: true
      },  

      //link
      link: {
        type: String,
        required: true
      }, 

});

// Create the Article model with Mongoose
var Article = mongoose.model('Article', ArticleSchema);

// Export the Model
module.exports = Article;