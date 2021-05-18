const Post=require('../models/posts')

module.exports.home=function(req,res){
    
    // Post.find({},function(err,post){

        
    //     return res.render('home',{
    //         title:"Colial | home",
    //         post:post
    //     })
    // }
    // )
   //popualate the user of each
    Post.find({}).populate('user').exec(function(err,post){
        console.log("populating")
        return res.render('home',{
            title:" Colial | Home ",
            post:post
        })
    })
}

//module.exports.actionName=function(req,res){}