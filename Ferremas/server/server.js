const express = require("express");
const path = require("path");

const startServer = (options) => {
  const { port, public_path = "public" } = options;

  const app = express();

  app.use(express.static(public_path));

  //Rutas
  app.get("/login", (req, res) => {
    const indexPath = path.join(__dirname, "..", public_path, "login.html");
    res.sendFile(indexPath);
  });
  app.get("/admin", (req, res) => {
    const indexPath = path.join(__dirname, "..", public_path, "admin_panel.html");
    res.sendFile(indexPath);
  });
  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "..", public_path, "login.html");
    res.sendFile(indexPath);
  });


  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
};

module.exports = { startServer };
