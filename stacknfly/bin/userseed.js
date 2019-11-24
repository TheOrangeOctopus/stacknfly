const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/stacknfly', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "alicesexy@gmail.com",
    banned: false,
    rol: "user",
    
    stacksSaved: "Architec mode",
  },
  {
    username: "fran",
    password: "goiko",
    email: "franelcanario@gmail.com",
    banned: false,
    stacksCreated: "Architec mode",
    rol: "admin"
  },
  {
    username: "dani",
    password: "grill",
    email: "danielgallego@gmail.com",
    banned: true,
    rol: "mod",
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})