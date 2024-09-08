import express from "express";
import bodyParser from "body-parser";

 
import { dirname } from "path";
import { fileURLToPath } from "url";
const dr = dirname(fileURLToPath(import.meta.url));
 
const app = express();
const port = 3333;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(dr + "/public/index.html");
});

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});






// //   echo "# To-do-list" >> README.md
// // git init
// // git add README.md
// // git commit -m "first commit"
// // git branch -M main
// // git remote add origin https://github.com/Msingh12345/To-do-list.git
// // git push -u origin main




