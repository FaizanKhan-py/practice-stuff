const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const route = require('./routes/route')
//mounting the routes
app.use('/api', route)

// -> /api/student
// -> /api/admin


app.get("/", (req, res) => {
  console.log("Main route handler hu");
  console.log(req.body);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
