var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    Name: String,
    Price: String,
    Image: String, 
    Description: String,
    author:{
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
    },
    comments: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
      }  
        
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);