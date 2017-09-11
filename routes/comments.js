var express = require("express");
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");

// NEW
router.get("/new",middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
           res.render("comments/new", {campground: campground});
        }
    })
    
})
//POST
router.post("/",middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});
// EDIT - shows edit form for a comment
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
  res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
});
// UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err){
            console.log(err)
        }else{
            req.flash("success", "Comment Updated");
            res.redirect("/campgrounds/" + req.params.id );
        }
    })
})
// DELETE
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;