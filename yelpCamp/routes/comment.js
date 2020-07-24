
var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../model/campground");
var Comment=require("../model/comment");
var middleware=require("../middleware");
//comments-NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
	console.log(req.params.id);
	Campground.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
		}else{
			res.render("comment/new",{camp:camp})
		}
	});
});
//comments-CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					
					camp.comments.push(comment);
					camp.save(function(err,camp){
						if(err){
							console.log(err);
						}else{
							req.flash("success","added a new comment!!!")
							res.redirect("/campgrounds/"+camp._id);
						}
					});
				}
			});
			
		}
	});
});
//COMMENT-EDIT
router.get("/:comment_id/edit",middleware.isAuthorized,function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if(err||!camp){
			req.flash("error","campground not found");
			return res.redirect("/campgrounds");
		}
		Comment.findById(req.params.comment_id,function(err,comment){
		if(err){
			console.log(err);
		}else{
			res.render("comment/edit",{comment:comment,camp_id:req.params.id});
		}
	});
	})
	
});
//COMMENT-UPDATE
router.put("/:comment_id",middleware.isAuthorized,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
		if(err){
			console.log(err);
		}else{
			req.flash("success","updated the comment!!!")
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
//COMMENT-DELETE
router.delete("/:comment_id",middleware.isAuthorized,function(req,res){
	Comment.findByIdAndDelete(req.params.comment_id,function(err,comment){
		if(err){
			console.log(err);
		}else{
			req.flash("success","deleted the comment")
			res.redirect("/campgrounds/"+req.params.id)
		}
	});
});

module.exports=router;