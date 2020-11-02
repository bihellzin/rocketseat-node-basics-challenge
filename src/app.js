const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  }

  repositories.push(repository);

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repository = repositories.find(obj => obj.id === id);

  if (repository) {
    repository.title = title;
    repository.url = url;
    repository.techs = techs;

    response.json(repository)
  } else {
    response.sendStatus(400)
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(obj => obj.id === id);

  if (index > -1) {
    repositories.splice(index, 1)
    response.sendStatus(204)
  } else {
    response.sendStatus(400)
  }

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(obj => obj.id === id);

  if (repository) {
    repository.likes += 1
    response.json(repository)
  } else {
    response.sendStatus(400)
  }
});

module.exports = app;
