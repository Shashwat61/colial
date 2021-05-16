const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/colial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',()=>{
    console.log('connected to db');
})

module.exports=db;