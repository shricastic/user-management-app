const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userId:{
            type:String, 
            unique: true,
            required: true
        },

        name:{
            type: String
        },

        role:{
            type: String, 
            default: 'user'
        },

        password:{
            type: String
        },
        
        profilePic:{
            data: Buffer,
            contentType: String
        },
        
        status:{
          type: Boolean,
          default: false
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
