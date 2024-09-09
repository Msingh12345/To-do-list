import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

import { dirname } from "path";
import { fileURLToPath } from "url";
const dr = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3333;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "msingh12345@",
  port: 5432,
});
db.connect();

let items = [{ id: 1, title: "buymilk" }];
console.log(items);

// db.query("SELECT * FROM todotable ORDER BY id ASC", (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     items = res.rows;
//     console.log(items);
//   }
// });



app.get("/", async(req, res) => {
  try {
    const result = await db.query("SELECT * FROM todotable ORDER BY id ASC");
    items = result.rows;
    console.log(items);
    res.render("index.ejs", {
      listitem: "Today",
      item: items,
    });
  } catch (err) {
    console.log(err);
  }
});


app.post("/add", async(req, res) => {
  const it = req.body.newItem;
  // items.push({title: item});
  try {
    await db.query("INSERT INTO todotable (title) VALUES ($1)", [it]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});


app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM todotable WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});



app.post("/edit", async (req, res) => {
  const it = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE todotable SET title = ($1) WHERE id = $2", [it, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});










// app.get("/", (req, res) => {
//   res.sendFile(dr + "/public/index.html");
// });

