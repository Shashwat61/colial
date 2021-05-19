const Post=require('../models/posts')
const User=require('../models/user')


module.exports.home=async function(req,res){
    
    // Post.find({},function(err,post){

        
    //     return res.render('home',{
    //         title:"Colial | home",
    //         post:post
    //     })
    // }
    // )

   //popualate the user of each
   try{

   
    let post=await Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }

    })
    
    let users=await User.find({});

    return res.render('home',{
                 title:" Colial | Home ",
                post:post,
                all_users:users

               });
} catch(err){
    console.log('error',err);
    return;

}
}

//module.exports.actionName=function(req,res){}