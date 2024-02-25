import express from "express";
import cors from "cors";
import fs from "fs";

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/data", (request, response) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      response.json(JSON.parse(data));
    }
  });
});

app.post("/data", (request, response) => {
  const newUser = request.body;
  const data = JSON.parse(fs.readFileSync("database.json", "utf8"));
  data.push(newUser);
  fs.writeFile("database.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
});



app.delete("/data/:index", (request, response) => {
  const index = parseInt(request.params.index);
  let data;

  try {
    const previousData = fs.readFileSync("database.json", "utf8");
    data = JSON.parse(previousData);
    
    data.splice(index, 1);

    fs.writeFileSync("database.json", JSON.stringify(data), "utf8");

    response.json(data);
  } catch (error) {
    console.error("Error:", error);
  }
});



app.listen(port, () => {
  console.log(`Your server is on on the port "http:localhost:${8080}"`);
});
