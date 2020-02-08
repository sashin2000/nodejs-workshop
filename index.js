var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tshirtshop'
});

conn.connect((err)=>{
    if(!err)
    console.log("DB Connected")
    else
    console.log(err)
});

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
  }));

app.use(bodyparser.json());

app.listen(8080,()=>console.log("Express Server Started"));

app.get('/api',(req,res)=>{

	res.sendStatus(200);
});

app.get('/api/categories/:category_id',(req,res)=>{
    var sql = 'SELECT * FROM category WHERE category_id = ?';
    conn.query(sql,[req.params.category_id],(err,rows,fields)=>{
        if(!err){
            res.status(200);
            res.send(rows)
        }else{
            res.sendStatus(500);
            console.log(err)
        }
    })
})

app.post('/api/customers',(req,res)=>{
    var values = [req.body.name,req.body.email,req.body.password];
    var sql = 'INSERT INTO customer(name,email,password) VALUES  (?)';
    conn.query(sql,[values],(err,rows,fields)=>{
        if(!err){
            res.status(201);
            res.send({'customer_id':rows.insertId})
        }else{
            res.sendStatus(500);
            console.log(err)
        }
    })
})