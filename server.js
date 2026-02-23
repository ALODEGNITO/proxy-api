const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_8081 = "http://41.138.61.43:8081";
const BASE_8082 = "http://41.138.61.43:8082";

// Authentification
app.get("/api/auth/:matricule/:pwd", async (req, res) => {
  const { matricule, pwd } = req.params;
  const url = `${BASE_8082}/api/wseentrele/${matricule}?tele=00000000&pass=${pwd}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Relèves non indexés
app.get("/api/non-index/:id", async (req, res) => {
  const url = `${BASE_8082}/api/wseenttrp/${req.params.id}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Relèves indexés
app.get("/api/index/:id", async (req, res) => {
  const url = `${BASE_8081}/api/wseentrelec/${req.params.id}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Liste releveurs
app.get("/api/releveurs", async (req, res) => {
  const response = await fetch(`${BASE_8082}/api/wseentrele`);
  const data = await response.json();
  res.json(data);
});

// Totaux
app.get("/api/totaux", async (req, res) => {
  const response = await fetch(`${BASE_8081}/api/wseentrelec`);
  const data = await response.json();
  res.json(data);
});

// Par agence
app.get("/api/agence", async (req, res) => {
  const response = await fetch(`${BASE_8081}/api/wseenrelecag`);
  const data = await response.json();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serveur démarré"));
