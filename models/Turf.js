const mongoose = require('mongoose');


const turfSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    addressLine1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String,
        required:true
    },
    pincode:{
        type:number,
        required:true,
        minLength:6,
        maxLength:6,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    },
    hourlyPrice:{
        type:Number,
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true});


module.exports = mongoose.model("Turf",turfSchema);