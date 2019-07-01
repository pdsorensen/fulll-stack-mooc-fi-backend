const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 3,
    required: true
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.password;
    delete returnedObject.v;
    delete returnedObject._id;
  }
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model("User", schema);
