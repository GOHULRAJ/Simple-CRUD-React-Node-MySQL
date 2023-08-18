const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express();
const mysql=require('mysql');

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"cruddatabase"

})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get("/api/get",(req,res)=>{
    const sqlSelect="select *from movie_reviews";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
        
        
    })
})

app.post("/api/insert",(req,res)=>{

    const movieName=req.body.movieName;
    const movie_review=req.body.movie_review;

    const sqlInsert="insert into movie_reviews (movieName,movie_review) values(?,?)";
    db.query(sqlInsert,[movieName,movie_review],(err,result)=>{
        res.send("Inserted Successfully!");
        console.log(result);
    })
})

app.get("/",(req,res)=>{
    res.send(`<h1 >This is Home Page of port:3001</h1>`);
})

app.delete("/api/delete/:movieName",(req,res)=>{
    const name=req.params.movieName;
    const sqlDelete="delete from movie_reviews where movieName=?";
    db.query(sqlDelete,name,(err,result)=>{
       if(err) console.log(err)
})
})

app.put("/api/update",(req,res)=>{
    const name=req.body.movieName;
    const review=req.body.movie_review;
    const sqlUpdate="update  movie_reviews set movie_review=? where movieName=?";
    db.query(sqlUpdate,[review,name],(err,result)=>{
       if(err) console.log(err)
})
})

app.listen(3001,()=>{
    console.log("listening port on 3001");
})