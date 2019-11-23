const express = require("express");
const app = express();
// const router = express.Router();

const strftime = require("strftime");
const timestampRouter = require('./timestamp');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/timestamp', timestampRouter);

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
// app.get("/api/timestamp/", (req, res) => {
//   res.json({ unix: Date.now(), utc: Date() });
// });

// app.get("/api/timestamp/:date_string?", function(req, res) {

// });
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
