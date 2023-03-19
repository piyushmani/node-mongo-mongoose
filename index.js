const express = require("express");
const mongoose = require('mongoose')
const {User} = require("./User");

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
    
    try {
        let new_user = new User({ ...req.body });
        await new_user.save();
        res.status(201).send({"message":"created"});
      } catch (error) {
        if (error.name === "ValidationError") {
          let errors = {};
    
          Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
          });
    
          return res.status(400).send(errors);
        }
        res.status(500).send("Something went wrong");
      }
  });

app.get("/users", async (req, res) => {
    let all_users = await User.find();
    return res.status(200).json(all_users);
});


const start = async () => {
    try {
      await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
      app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();