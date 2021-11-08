const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const {ObjectId} = mongoose.Schema;

const turfSchema = new mongoose.Schema({
    turf:{
        type:ObjectId,
        ref:"Turf"
    }
})


const partnerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:32,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        maxLength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    turfsOwned:[turfSchema]
},{timestamps:true});


partnerSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

partnerSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};


module.exports = mongoose.model("Partner",partnerSchema);