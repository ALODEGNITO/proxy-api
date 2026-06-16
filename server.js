const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const BASE_8081 = "http://41.138.61.43:8081";
const BASE_8082 = "http://41.138.61.43:8082";

/**
 * AUTHENTIFICATION
 */
app.get("/api/auth/:matricule/:pwd", async (req, res) => {
    try {
        const { matricule, pwd } = req.params;

        const url =
            `${BASE_8082}/api/wseentrele/${matricule}?tele=00000000&pass=${pwd}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Erreur Auth :", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * RELÈVES NON INDEXÉS
 */
app.get("/api/non-index/:id", async (req, res) => {
    try {
        const url = `${BASE_8082}/api/wseenttrp/${req.params.id}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Erreur Non Index :", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * RELÈVES INDEXÉS
 */
app.get("/api/index/:id", async (req, res) => {
    try {
        const url = `${BASE_8081}/api/wseentrelec/${req.params.id}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Erreur Index :", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * LISTE DES RELEVEURS
 */
app.get("/api/releveurs", async (req, res) => {
    try {
        const response = await fetch(`${BASE_8082}/api/wseentrele`);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Erreur Releveurs :", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * TOTAUX
 */
app.get("/api/totaux", async (req, res) => {
    try {
        const response = await fetch(`${BASE_8081}/api/wseentrelec`);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Erreur Totaux :", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * STATISTIQUES PAR AGENCE
 */
app.get("/api/agence", async (req, res) => {
    try {
        const response = await fetch(`${BASE_8081}/api/wseenrelecag`);

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Erreur Agence :", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * ROUTE TEST
 */
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API e-SuiviRel opérationnelle"
    });
});

/**
 * DEMARRAGE DU SERVEUR
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
