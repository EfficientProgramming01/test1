// grab the packages we need

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
// Connection URL
const url = 'mongodb://localhost:27017';
app.use(express.json()); // receive all in jscon format
const port = process.env.PORT || 4000;
const db_name ="Coaches";
const collection_name ="coaches"
let responses = null ;

let lteData = {}

// Create a new collection

 function createMyCollection(collection_name,db_name){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        dbo.createCollection(collection_name, function(err, res) {
          if (err) throw err;
          console.log("Collection created!");
          db.close();
          console.log(res)
          return res
        });  
        
    });     

};


// connect to our mongodb database

let cashedClient = null;
let cashedDb = null

async function connectToDatabase(){

    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
      });

    const db = client.db(dbName);
    
    return db;

}


// create our route

app.get('/',async(req,res)=>{

    res.send('Welcome to Rail Pulse');
   
})


app.get('/data',async(req,res)=>{

  res.send(lteData);
 
})


app.get('/lte/:id',async(req,res)=>{

 // console.log(JSON.stringify(req.query))
 lteData = JSON.stringify(req.query)
  res.send(JSON.stringify(req.query))

 
})


app.get('/mc',async(req,res)=>{

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);
    dbo.collection(collection_name).find({}).toArray(function(err, resp) {
      if (err) throw err;
      res.send({resp})
      db.close();
    });
  });
})

  // create


  app.post('/mc',async(req,res)=>{
    const new_Data = req.body.new_Data
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        var myobj = new_Data;
        dbo.collection(collection_name).insertOne(myobj, function(err, resp) {
          if (err) throw err;
           res.send({resp})
          db.close();
          
        });
      });
}) 



app.put('/mc',async(req,res)=>{
    const query_Data = req.body.query_Data
    const new_Data = req.body.new_Data
   
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        var myquery = query_Data;
        var newvalues = { $set: new_Data };
        dbo.collection(collection_name).updateOne(myquery, newvalues, function(err, resp) {
          if (err) throw err;
          res.send({resp})
          db.close();
        
        });
      });
  
}) 


// Delete specific data in the database

app.delete('/mc',async(req,res)=>{
  const query_Data = req.body.query_Data
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(db_name);
      var myobj = query_Data;
     dbo.collection(collection_name).deleteOne(myobj, function(err, resp) {
        if (err) throw err;
         res.send({resp})
        db.close();
        
      });
    });
}) 


// create the server

app.listen(port,()=>{
    console.log("Our app is running on port",port)
})