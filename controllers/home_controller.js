const Post=require('../models/posts')
const User=require('../models/user')
module.exports.home=function(req,res){
    
    // Post.find({},function(err,post){

        
    //     return res.render('home',{
    //         title:"Colial | home",
    //         post:post
    //     })
    // }
    // )
   //popualate the user of each
    Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }

    })
    
    .exec(function(err,post){
         User.find({},function(err,users){

             console.log("populating")
             return res.render('home',{
                 title:" Colial | Home ",
                 post:post,
                 all_users:users

                })
        })
    })
}

//module.exports.actionName=function(req,res){}