const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/:endpoint", async (req, res) => {
  try {
    const endpoint = req.params.endpoint;

    const response = await fetch(
      `http://41.138.61.43:8081/api/${endpoint}`
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Erreur proxy" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running"));
