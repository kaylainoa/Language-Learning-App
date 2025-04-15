const mongoose = require('mongoose');
//this will be used to create products in teh database
//rn remember is required field and set to false - 0
    //when checkbox clicked it should be set to true
const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter email"]
        },

        password: {
            type: String,
            required: true,
            default: 0,
        },

        rememberMe: {
            type: Boolean,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false,
        },

    },
    {
        timestamps: true
    }
);

const User = mongoose.model("Login", UserSchema);
module.exports = User;