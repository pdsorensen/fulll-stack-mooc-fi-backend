require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./errorHandler");
const Person = require("./models/person");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("body", function(request, response) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/info", (request, response) => {
  res.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
</div>`);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(result => {
    response.json(result);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const { number } = request.body;
  Person.findByIdAndUpdate(request.params.id, { number }).then(result =>
    response.json(result)
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Person.findByIdAndRemove(id).then(result => {
    response.status(204).end();
  });
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number
  });

  person
    .save()
    .then(savedPerson => response.json(savedPerson.toJSON()))
    .catch(error => response.status(400).json({ error }));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
