var mongoose=require("mongoose");
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true ,useUnifiedTopology:true,useFindAndModify:false});
// mongoose.connect('mongodb://localhost:27017/yelpcamp_app', { useNewUrlParser: true ,useUnifiedTopology:true}); 
// mongoose.connect('mongodb+srv://nandhini:nandhini123@cluster0.7gj2x.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true ,useUnifiedTopology:true,useFindAndModify:false});
var Comment=require("./model/comment");
var Campground=require("./model/campground");
var data=[{
	name:"camp 1",
	image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"lovely lakeside camp"
			},
		  {
	name:"camp 2",
	image:"https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"blah blah blah"
			},
		  {
	name:"camp 1",
	image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"lovely experience with friends"
			}
		 ];
function seedDb(){
	Campground.remove(function(err){
		if(err){
			console.log(err);
		}else{
			console.log("deleted all ");
			// data.forEach(function(seed){
			// 	Campground.create(seed,function(err,camp){
			// 	if(err){
			// 		console.log(err);
			// 	}else{
			// 		console.log("created");
			// 		Comment.create({
			// 			text:"okay lovely place accepted!!!",
			// 			author:"me"
			// 		},function(err,comment){
			// 			if(err){
			// 				console.log(err);
			// 			}else{
			// 				camp.comments.push(comment);
			// 				camp.save();
			// 				console.log(camp);
			// 			}					
			// 		});
			// 	}			
			// });
			//});
			
		}
	});
}
module.exports=seedDb;