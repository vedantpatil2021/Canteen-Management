const mg = require('mongoose');

const orderschema = new mg.Schema({
    order : [
        {
            name : {
                type: String,
                required : true
            },
            category : {
                type : String,
                required : true
            },
            image : {
                type : String,
                required : true
            },
            price : {
                type : String,
                required : true
            },
            id : {
                type : String,
                required : true
            },
            itemTotal : {
                type : Number,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            },
            type : {
                type : String,
                required : true
            }
        }
    ],    
    totalprice :{
        type : Number,
        required : true
    },
    orderDate : {
        type : Date,
        required : true
    },
    orderStatus :{
        type : String , 
        required : true
    },
    paymentStatus : {
        type : String,
        required : true
    }
})

const ADDOrder = mg.model("AddOrder", orderschema);

module.exports = ADDOrder;