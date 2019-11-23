const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});


app.get("/api/timestamp",(req,res)=>{
    var date = new Date();  
    res.json({"unix":date.getTime(), 
              "utc": date.toUTCString()})
  
});

app.get("/api/timestamp/:date_string",(req,res)=>{
  var date_string = req.params.date_string;
  if ( String(parseInt(date_string))===date_string){ // Not date type
    var date = new Date(parseInt(date_string)*1000);    
  } else {
    var date = new Date(date_string);  
  }
  res.json({"unix":date.getTime(), 
            "utc": date.toUTCString()})
  
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
