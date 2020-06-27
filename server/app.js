const express = require ('express');
const app = express();
const PORT=5000;
const mongoose = require('mongoose');
const {MONGOURI}= require('./keys');

require('./models/user');

app.use(express.json());
app.use(require("./routes/auth"));


mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('connected',()=>{
  console.log('connected to mongodb');
})
mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongodb",err);
});

app.listen(PORT,()=>{
  console.log("Server is running at",PORT)
})

















// const customMiddleWare = (req, res, next) => {
//   console.log("Middleware executed");
//   next();
// };
//bpfi9JYGB9ki230G
//app.use(customMiddleWare);

// app.get('/',(req,res)=>{
//   res.send("Hello Kiran");
// })


// app.get("/about",customMiddleWare, (req,res) => {
//   console.log("About page")
//   res.send("About page");
// });