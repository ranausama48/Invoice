const express = require("express");
const router = express.Router();
const User = require("../model/signup");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/registration", (req, res, next) => {
  const { name, email, phone, companyName, address, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      res.status(400).json({ message: "this Email is already registerd" });
    } else {
      let newUser = new User({
        name: name,
        email: email,
        phone: phone,
        companyName: companyName,
        address: address,
        password: password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(userRecord => {
            jwt.sign(
              { id: userRecord.id },
              "secret_key",
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  userRecord
                });
              }
            );
          });
        });
      });
      //   newUser
      //     .save()
      //     .then(userRecord => {
      //       res.json(userRecord);
      //     })
      //     .catch(() => {
      //       err => console.log(err);
      //     });
    }
  });
  //   const name = req.body.name;
  //   const email = req.body.email;
  //   const phone = req.body.phone;
  //   const companyName = req.body.companyName;
  //   const address = req.body.address;
  //   const password = req.body.password;
});
module.exports = router;
