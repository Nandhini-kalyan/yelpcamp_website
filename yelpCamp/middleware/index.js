var middlewareObj={};
var Campground=require("../model/campground");
var Comment=require("../model/comment")
//OWNERSHIPCHECK-COMMENTS
middlewareObj.isAuthorized=	function (req,res,next){
			if(req.isAuthenticated()){
				Comment.findById(req.params.comment_id,function(err,comment){
					if(err||!comment){
						req.flash("error","comment not found");
						res.redirect("/campgrounds");
					}else{
						if(req.user.username==comment.author.username){
							next();
						}else{
							req.flash("error","you are not allowed to do this");
							res.redirect("back");
						}
					}
				});
			}else{
				req.flash("error","you need to login");
				res.redirect("/login");
			}
		}

//IS LOGGED IN
middlewareObj.isLoggedIn=function (req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		req.flash("error","you need to login");
		res.redirect("/login");
	}
//OWNERSHIPCHECK-CAMPGROUND
middlewareObj.ownershipCheck=
	function (req,res,next){
		if(req.isAuthenticated()){
			Campground.findById(req.params.id,function(err,camp){
				if(err||!camp){
					req.flash("error","campground not found");
					res.redirect("/campgrounds");
				}else{
						if(camp.author.username==req.user.username){
						next();
					}else{
							req.flash("error","you are not allowed to do this");
							res.redirect("/campgrounds/"+camp._id);
						}
				}

			});
		}else{
			req.flash("error","you need to log in")
			res.redirect("/login");
		}
	}



module.exports=middlewareObj;
