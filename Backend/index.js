const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

require('./database/connection');
app.use(express.json())
app.use(require('./router/authorization'))//linking the router file to be in use
app.get("/",(req,res) => {
    res.send(`hello this is backend`);
});

app.get('/userlogin',(req,res)=>{
    res.send(`Hello this is from server attaching the token khi khi`)
})

app.listen(5000, () => {
    console.log("Server is listening on port 5000")
});