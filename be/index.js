import express from "express";
import cors from "cors";

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { name: "Haliuka", age: 26 },
  { name: "Nomio", age: 28 },
  { name: "Zulaa", age: 24 },
  { name: "Zaya", age: 30 },
  { name: "Zolzaya", age: 31 },
  { name: "Bayraa", age: 22 },
];

app.get("/user", (request, response) => {
  response.send(users);
});

app.post("/user", (request, response) => {
  const newUser = request.body;
  users.push(newUser);
  response.send(newUser);
});

app.listen(port, () => {
  console.log(`Your server is on on the port "http:localhost:${8080}"`);
});
