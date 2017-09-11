var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments")
var data = [
        {
            Name:"Tree Forest",
            Image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?dpr=1&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=",
            Description: "Lorem ipsum dolor sit amet, ne autem fabellas cum, et persius voluptaria qui, sea fierent sententiae te. Omnium alterum debitis usu te, liber nostro nec te, ex cum paulo molestiae voluptatibus. Delectus omittantur ei pri, pro ea assum invidunt. Ad adhuc explicari eos, te prima soluta laoreet vel. Usu cu torquatos voluptatum. Mei meis illum dolorum ex." 
        },
        {
           Name: "Dersert Camp",
           Image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?dpr=1&auto=compress,format&fit=crop&w=376&h=250&q=80&cs=tinysrgb&crop=",
           Description: "Lorem ipsum dolor sit amet, ne autem fabellas cum, et persius voluptaria qui, sea fierent sententiae te. Omnium alterum debitis usu te, liber nostro nec te, ex cum paulo molestiae voluptatibus. Delectus omittantur ei pri, pro ea assum invidunt. Ad adhuc explicari eos, te prima soluta laoreet vel. Usu cu torquatos voluptatum. Mei meis illum dolorum ex."
        },
        {
            Name: "Sky Lake",
            Image: "http://lifeoutdoorproducts.com/wp-content/uploads/2017/02/Camping_1486140443.jpg",
            Description: "Lorem ipsum dolor sit amet, ne autem fabellas cum, et persius voluptaria qui, sea fierent sententiae te. Omnium alterum debitis usu te, liber nostro nec te, ex cum paulo molestiae voluptatibus. Delectus omittantur ei pri, pro ea assum invidunt. Ad adhuc explicari eos, te prima soluta laoreet vel. Usu cu torquatos voluptatum. Mei meis illum dolorum ex."
        },
        
    ]
function seedDb(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Campgrounds have been removed");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("campground created");
                        Comment.create(
                            {
                                text: "This place is great i just wish it had internet",
                                author: "Homer"
                            },
                            function(err, comment){
                                if(err){
                                    console.log(err)
                                }else{
                                        campground.comments.push(comment)
                                        campground.save();
                                        console.log("Created new comment");
                                    }
                            });
                    }
                });
            });
        }
    });

}

module.exports = seedDb;