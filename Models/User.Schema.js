import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // You can also add a custom email validation regex here if needed
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'], // Add this line for password length validation
    },
    number: {
        type: String,
    },
    userType : {
        type : String,
        default: "Costumer"
    },
    userProfile : {
        type:String
    }
}, { timestamps: true });

export const DUser = mongoose.model("DecorUsers", userSchema);
