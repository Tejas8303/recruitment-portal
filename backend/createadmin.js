const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/recruitment");

async function createAdmin(){

 const hashed = await bcrypt.hash("admin123",10);

 const admin = new User({
  name:"Admin",
  email:"admin@test.com",
  password:hashed,
  role:"admin"
 });

 await admin.save();

 console.log("Admin created");

 process.exit();
}

createAdmin();