const User = require("../models/user");


module.exports.profile=function(req,res){
 if(req.cookies.user_id){
    User.findById(req.cookies.user_id,function(err,user){
       if(user){
          return res.render('users',{
             title:"User Profile",
             user:user
          })
       }else{

          return res.redirect('/users/sign-in')
         }
    })

 }else{
    return res.redirect('back')
 }
   
}
//render signUp page
module.exports.signUp=function(req,res){
   return res.render('user_sign_up',{
      title:"Colial | Sign Up"
   })
}

//render signUp page
module.exports.signIn=function(req,res){
   return res.render('user_sign_in',{
      title:"Colial | Sign In"
   })
}
//sign out functionality
module.exports.signOut=function(req,res){
    res.clearCookie('user_id');
     return res.redirect('/users/sign-in')
}

//get the sign up data

module.exports.create=function(req,res){
  if(req.body.password!=req.body.confirm_password){
     return res.redirect('back')
  }
  User.findOne({email:req.body.email},function(err,user){
     if(err){
        console.log("error in finding user in signing up")
        return;
     }
     if(!user){
        User.create(req.body,function(err,user){
         if(err){
            console.log("error in finding user in signing up")
            return;
         }
         return res.redirect('/users/sign-in');
        })
     }else{
        return res.redirect('back');
     }
  })
  
}

//sign in and create session for the usr
module.exports.createSession=function(req,res){
   //steps to authenticate       
   //find the user 
   User.findOne({email:req.body.email},function(err,user){
      if(err){
         console.log("error in finding user in signing in")
         return;
   }


   //handle user found
   if(user){
      
      //handle password which dont match
      if(user.password!=req.body.password){
         return res.redirect('back')
      }
      //handle session creation
      res.cookie('user_id',user.id);
      return res.redirect('/users/profile')

          }else{
              return res.redirect('back')
          }


          //handle user not found
})
}
