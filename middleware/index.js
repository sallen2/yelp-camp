var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

var middleObj = {
    
}

  middleObj.checkCampgroundOwnership = function(req, res, next){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err || !foundCampground){
          console.log(err);
          req.flash('error', 'Sorry, that campground does not exist!');
          res.redirect('/campgrounds');
      } else if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
          req.campground = foundCampground;
          next();
      } else {
          req.flash('error', 'You don\'t have permission to do that!');
          res.redirect('/campgrounds/' + req.params.id);
      }
    });
  }
  
  middleObj.checkCommentOwnership = function(req, res, next){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err || !foundComment){
           console.log(err);
           req.flash('error', 'Sorry, that comment does not exist!');
           res.redirect('/campgrounds');
       } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
            req.comment = foundComment;
            next();
       } else {
           req.flash('error', 'You don\'t have permission to do that!');
           res.redirect('/campgrounds/' + req.params.id);
       }
    });
  }

middleObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in.")
    res.redirect("/login");
}

module.exports = middleObj;