const mongoose = require('mongoose')

var CryptoJS = require("crypto-js");

const SECRET_KEY = "mSnhzshXXX"


const encrypt = (string) => CryptoJS.AES.encrypt(string, SECRET_KEY).toString();
const decrypt = (ciphertext) => CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(CryptoJS.enc.Utf8);


const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = new Schema({
fullName : {
    type: String,
    required: true,
  },
mobileNumber: {
    type: String,
    required: true,
  },
address:{
    type: String,
    required: true,
  },
emailId:{
    type: String,
    required: true,
  }
})

UserSchema.pre("save", function (next) {
    console.log("working ??..")
    this.emailId= encrypt(this.emailId)
    this.fullName= encrypt(this.fullName)
    this.mobileNumber= encrypt(this.mobileNumber)
    next()
})

UserSchema.post('find', function(document) {
    document.forEach(function (doc) {
        doc.emailId = decrypt(doc.emailId )
        doc.fullName = decrypt(doc.fullName )
        doc.mobileNumber = decrypt(doc.mobileNumber )
    });
  });

const User = Model('User',UserSchema)

module.exports = { User };