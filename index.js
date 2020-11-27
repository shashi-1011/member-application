//bringing the express from the packages
const express = require('express');
const path = require('path');
const logger =  require('./middlewaer/logger');
const exphbs = require('express-handlebars');
const member = require('./Members');

//intalzing the express
const app=express();

//handlebars middlewear\
//setting the templates engine using this code 
//seeting the defaultlyout to the main.handlebars
app.engine('handlebars', exphbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');


//bodyparse middlewar
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//urlencoded is use to handle the url data

//rednring the index view
app.get('/',(req,res)=> res.render('index',{
    title:"MEMBER ENTRY APP",
    member
    
}));
//if you need to make the page static follow the below code
  app.use(express.static(path.join(__dirname,'public')));
app.use('/api/members', require('./routes/api/members'));

//routing to the menbers
//sending the request
// app.get('/', (req,res)=>{    
//     //we are sending the file from the public folder named as index.html
//     //the sendfile will have the basci following syntax 
//     res.sendFile(path.join(__dirname, 'public','index.html'));
// })
//making a port to listen for request and resposne
const PORT = process.env.PORT || 5000;

//PROCESS.ENV.PORT first checks the avalable ports if donest have any then picks the 5000 port

//making listen to the port
app.listen(PORT, ()=>console.log(`server strated at port ${PORT}`));
// to check type node index in the integrated terminal