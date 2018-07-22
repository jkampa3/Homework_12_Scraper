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

  //biline
  source: {
    type: String,
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

  //image
  img: {
    type: String,
  },

  //join comments
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }]

});

// create the article model with mongoose
var Articles = mongoose.model('Articles', ArticleSchema);

// export the model
module.exports = Articles;