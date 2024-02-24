import fs from "fs";

// fs.mkdir("test", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully created a new folder");
//     }
// });
const users = fs.readFileSync("database.json");
console.log(users.toString());
// const data = {age: 18, name: "Bilguundul"};
// fs.writeFileSync("database.json", JSON.stringify(data), (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully created the file");
//     }
// })

// fs.writeFile("writeFile.txt", "testiiiingggg", (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully created a new file");
//     }
// })

// const data = fs.readFileSync("text.txt");
// console.log(data.toString());

// fs.readFile("text.txt", (err, data) => console.log(data.toString()));