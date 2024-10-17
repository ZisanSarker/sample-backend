const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: function (value) {
          return (
            validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            })
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
