const mongoose = require("mongoose");
const Person = require("./models/person");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true });

if (process.argv.length === 3) {
  // show stuff
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number
  });

  person.save().then(response => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
