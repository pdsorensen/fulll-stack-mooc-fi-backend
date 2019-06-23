const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => console.log("connected to MongoDB"))
  .catch(error => console.log("error connecting to MongoDB:", error.message));

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  number: { type: String, required: true, unique: true, minlength: 8 }
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", schema);
