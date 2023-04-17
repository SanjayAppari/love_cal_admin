const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
mongoose.connect('mongodb+srv://sanjay:sanjay@cluster0.aqybfjz.mongodb.net/love_cal_V-2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
mongoose.set('strictQuery', true);



const pair_schema = new mongoose.Schema({
    fname: String,
    sname: String
});



const app = express();

const Pair = mongoose.model("pair", pair_schema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("images"));

app.get("/",function(req,res){
    Pair.find({},function(err,data){
        if(err) console.log("Error at home route");
        else res.render("index",{data:data});
    })
})

app.get("/delete/:id",function(req,res){
    var id = req.params.id;
    Pair.deleteOne({ _id:id }).then(function(){
        Pair.find({},function(err,data){
            if(err) console.log("Error at home route");
            else res.render("index",{data:data});
        });
    }).catch(function(error) {
        console.log("Error at deletetool");
    });
});

app.listen(1910, () => {
    console.log("Server started at 1910");
});


