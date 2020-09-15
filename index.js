const express = require('express');
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser('json'))

var mysql = require('mysql2');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "createdb"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});



app.post('/stud', function (req, res) {
    const body = req.body;
    console.log(body)

    var sql = `INSERT INTO stud(name,age,address) VALUES ('${body.name}', ${body.age},'${body.address}')`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("Something went wrong")
            console.log(err)
            res.status(500).json({
                error: err.message
            })
        }
        res.status(200).json({
            message: "ok",
            data: result
        })
    })
})
     


app.get('/studs',function(req,res){
   
    var sql1="SELECT * FROM stud";
    con.query(sql1,function(err,result){
        if (err){
            console.log("Something went wrong")
            console.log(err)
            res.status(500).json({
                error: err.message
            }) 
        }
        res.status(200).json({
            message: "data retreived",
            data: result
        })
    })
})



app.get('/stud/:id', function (req, res) {
    const body = req.body;
    const pathParams = req.params
    console.log(pathParams)

    var sql2=`SELECT * FROM stud WHERE id=${pathParams.id}`;
    con.query(sql2, function(err, result){
        if (err){
            console.log("Something went wrong")
            console.log(err)
            res.status(500).json({
                error: err.message
            })  
        }
    
        // TODO: check if the results is empty

        if (result.length === 0){
            res.status(404).json({
                message:"no such data",
                data:result
                
            })
        } else {
            
            res.status(200).json({
                message: "data retreived",
                data: result
            })
        }

    })
})




app.put('/stud',function (req, res){
    const body = req.body;
    console.log(body)


    var sql3=`UPDATE stud SET name='${body.name}', age=${body.age}, address='${body.address}' WHERE id=${body.id}`;
    con.query(sql3, function(err, result){
        if (err) {
            console.log("Something went wrong.Try again")
            console.log(err)
            res.status(500).json({
                error: err.message
            })    
        }
        //if there is no data to be updated
        if (result.affectedRows === 0){
            res.status(404).json({
                message:"no data found to update",
                
            })
        } else {
        res.status(200).json({
            message: "data updated",
            data: result
         })
        }
    })
})



app.delete('/stud/:id',function (req, res){
    const body = req.body;
    const pathParams = req.params
    console.log(pathParams)

    var sql3=`DELETE FROM stud WHERE id=${pathParams.id}`;
    con.query(sql3, function(err, result){
        if(err){
            console.log("Something went wrong")
            console.log(err)
            res.status(500).json({
                error: err.message
            })    
        }
        //if there is no data to be deleted
        if (result.affectedRows === 0){
            res.status(404).json({
                message:"no data found to delete",
                
            })
        } else {
        res.status(200).json({
            message: "data deleted",
            data: result
        })

        }
})
})


app.listen(3000)



/*

GET - /studs
GET - /stud/{id} => path params
POST - /stud => body parse
PUT - /stud =>
DELETE - /stud/{id}

*/