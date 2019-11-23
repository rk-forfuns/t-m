const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const date_string = req.params.date_string;
  if (String(parseInt(date_string)) === date_string) {
    // Not date type
    const date = new Date(parseInt(date_string) * 1000);
    if (!date.getTime()) {
      return res.status(400).json({
        error: "Invalid Date"
      });
    } else {
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
  } else {
    const date = new Date(date_string);
    if (!date.getTime()) {
      return res.status(400).json({
        error: "Invalid Date"
      });
    } else {
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
  }
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
