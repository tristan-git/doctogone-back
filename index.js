const express = require("express");
const app = express();
const port = 3010;
const connection = require("./config");

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("page accueil");
});

app.get("/api/movies", (req, res) => {
  connection.query("SELECT * FROM movie", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/movies/names", (req, res) => {
  connection.query("SELECT name FROM movie", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      res.json(results);
    }
  });
});

// écoute de l'url "/api/employees" avec le verbe POST
app.post("/api/employees", (req, res) => {
  // récupération des données envoyées
  const formData = req.body;

  // connexion à la base de données, et insertion de l'employé
  connection.query("INSERT INTO employee SET ?", formData, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(formData);
      res.status(500).send("Erreur lors de la sauvegarde d'un employé");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// app.post("/api/movies", (req, res) => {
//   const formData = req.body;
//   connection.query("INSERT INTO movie SET ?", formData, (err, results) => {
//     if (err) {
//       console.log(formData);
//       res.status(500).send("Erreur lors de la sauvegarde d'un film");
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// http://localhost:3010/api/movies/one-piece&23
app.delete("/api/movies/:name&:id", (req, res) => {
  // récupération des données envoyées
  const idMovie = req.params.id;

  // connexion à la base de données, et suppression de l'employé
  connection.query("DELETE FROM movie WHERE id = ?", [idMovie], (err) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression du film");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
