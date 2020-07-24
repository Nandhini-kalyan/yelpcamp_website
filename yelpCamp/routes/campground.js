var express=require("express");
var router=express.Router();
var Campground=require("../model/campground");
var middleware=require("../middleware/index");
//INDEX
router.get("/",function (req,res){	
	Campground.find({},function(err,camps){
		if(err){
			console.log("somethimg went wrong!!!");
		}else{
		res.render("campground/index",{campgrounds:camps});
		}
	});
	
	
});
//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campground/new");
});
//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
	req.body.camp.author={
		id:req.user._id,
		username:req.user.username
	};
	Campground.create(req.body.camp,function(err,newCamp){
	if(err)
	{console.log("something went wrong!!");
	}
	else{
		req.flash("success","successfully created a new campground "+newCamp.name);
		res.redirect("/campgrounds");
	}
});
	
});
//SHOW
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,camp){
		if(err||!camp){
			req.flash("error","campground not found");
			res.redirect("/campgrounds");
		}else{	
			
			res.render("campground/show",{camp:camp});
		}
	});
});
//EDIT
router.get("/:id/edit",middleware.ownershipCheck,function(req,res){
	
	Campground.findById(req.params.id,function(err,camp){
		if(err){
			console.log(err);
		}else{
			res.render("campground/edit",{camp:camp});
			
		}
	});	
	
	
});
//UPDATE
router.put("/:id",middleware.ownershipCheck,function(req,res){
	
	
	Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,camp){
		if(err){
			console.log(err);
		}else{
			req.flash("success","updated "+camp.name+"!!!");
			res.redirect("/campgrounds/"+req.params.id);			
		}

	});
	
});

//DELETE
router.delete("/:id",middleware.ownershipCheck,function(req,res){
	
	Campground.findByIdAndDelete(req.params.id,function(err,camp){
		if(err){
			console.log(err);
		}else{
			req.flash("success","deleted"+camp.name+"!!!");
			res.redirect("/campgrounds");		
		}
	});
	
	
	
});



module.exports=router;