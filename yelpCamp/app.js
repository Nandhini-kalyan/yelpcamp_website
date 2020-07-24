var express       =require("express"),
	 app          =express(),
	 bodyParser   =require("body-parser"),
	 mongoose     =require("mongoose"),
	methodOverride=require("method-override"),
	flash         =require("connect-flash")
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true ,useUnifiedTopology:true,useFindAndModify:false});
// mongoose.connect('mongodb+srv://nandhini:password@cluster0.7gj2x.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true ,useUnifiedTopology:true,useFindAndModify:false}); 
// mongoose.connect('mongodb://localhost:27017/yelpcamp_app', { useNewUrlParser: true ,useUnifiedTopology:true,useFindAndModify:false}); 

//requiring models
var Comment    =require("./model/comment"),
	
	 Campground=require("./model/campground"),
	 User      =require("./model/user")
//requiring routes
var commentRoutes    =require("./routes/comment"),
	 campgroundRoutes=require("./routes/campground"),
	 indexRoutes     =require("./routes/index")

app.use(flash());
var seedDb=require("./seed");
//passport requires
var passport              =require("passport"),
	localStrategy         =require("passport-local"),
	 passportLocalMongoose=require("passport-local-mongoose")
//
//passport config
app.use(require('express-session')({
	secret:"this is a secret",
	resave:false,
	saveUninitialized:false
}));

passport.use(new localStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//


//seedDb();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));




//================for using currentUser in every route
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");;
	res.locals.success=req.flash("success");
	next();
});
//=================
//================== using routes
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
	console.log("yelpcamp server has started");
});