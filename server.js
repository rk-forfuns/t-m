const express = require("express");
const app = express();
const strftime = require('strftime');

app.use(express.json());

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:data", function(req, res) {
  let date = new Date();
  if (/^\d*$/.test(req.params.data)) {
    date.setTime(req.params.data);
  } else {
    date = new Date(req.params.data);
  }
  if (!date.getTime())
    res.send(JSON.stringify({ error: "Invalid date given" }));
  // else, we send the object with two members (unix and natural)
  else
    res.send(
      JSON.stringify({
        unix: date.getTime(),
        natural: strftime("%B %d, %Y", date)
      })
    );
});
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
