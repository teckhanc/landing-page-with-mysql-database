var mysql = require('mysql2')
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// if static file e.g. css file is located in the same directory
//app.use(express.static(__dirname));
// or created a new directory, a new directory is better practice
app.use(express.static(__dirname + "/styles"));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin1234',
    database: 'join_us'
});

app.get("/", function(req, res) {
    var q = "select count(*) as count from users";
    connection.query(q, function(error, results) {
        if (error) throw error;
        var count = results[0].count;
//        res.send("we have " + count + " users in our db");
        res.render("home", {count: count});
    });
});

app.post("/register", function(req, res) {
    var person = {
        email: req.body.email
    };
    connection.query('insert into users set?', person, function(error, result) {
        if (error) throw error;
        res.send("Thanks for joining bye!");
//        res.redirect("/");
    });
});


//app.get("/", function(req, res) {
//    console.log("new request");
//    res.send("hello from our web app!");
//});

app.get("/joke", function(req, res) {
    var joke = "you are a joke";
    res.send(joke);
});

app.get("/random_num", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

app.listen(8080, function() {
    console.log("App listening on port 8080");
});