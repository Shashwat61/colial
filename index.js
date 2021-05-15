const express=require('express')

const app=express();
const port=8000;

//use express router
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`error in running server : ${err}`)
    }
     console.log(`server started on : ${port}`)
})