import express from "express";

const app=express();
const port=3333;



app.get("", (req, res) => {
    res.send("hjj");
  });
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });