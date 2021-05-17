const express=require('express')
const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;
const db=require('./config/mongoose')
const cookieParser=require('cookie-parser');
//used for session cookie and authentication passport
const session=require('express-session')
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const MongoStore=require('connect-mongodb-session')(session);

app.use(express.urlencoded())
app.use(cookieParser())
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


//set up the view-engine
app.set('view engine','ejs');
app.set('views','./views')


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'colial',
    //todo change the secret before deployment in prod mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect mongodb setup ok')
    }
    )
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));



app.listen(port,(err)=>{
    if(err){
        console.log(`error in running server : ${err}`)
    }
     console.log(`server started on : ${port}`)
})