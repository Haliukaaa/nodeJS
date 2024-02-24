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
  const indexToDelete = request.params.index;
  // Check if the index is valid
  if (indexToDelete < 0 || indexToDelete >= users.length) {
    return response.status(400).json({ error: "Invalid index" });
  }

  // Remove the user at the specified index
  users.splice(indexToDelete, 1);
  // Respond with the updated data
  response.json(users);
});


app.listen(port, () => {
  console.log(`Your server is on on the port "http:localhost:${8080}"`);
});
