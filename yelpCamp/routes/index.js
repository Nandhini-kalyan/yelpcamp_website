
var express=require("express");
var router=express.Router();
var passport=require("passport")
var User=require("../model/user");
router.get("/",function (req,res){
	res.render("landing");
});
//LOGIN
router.get("/login",function(req,res){
	res.render("login");
});
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
	req.flash("success","successfully logged in");
	res.redirect("/campgrounds");
  });

//REGISTER
router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","successfully registered");
			res.redirect("/campgrounds");
		});
	});
});

//LOGOUT
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","successfully logged out");
	res.redirect("/");
});

module.exports=router;