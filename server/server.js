const express = require("express");
const app = express();

app.listen(3000, ["192.168.1.5", "localhost"], () => {
  console.log(`Listening to requests on http://localhost:3000`);
});

app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/BTC.html");
});
