const express = require("express");
const path = require("path");

const startServer = (options) => {
  const { port, public_path = "public" } = options;

  const app = express();


  app.use(express.static(public_path));
  app.use('/js', express.static(path.join(__dirname, '../public/js')));
  app.use('/img', express.static(path.join(__dirname, '../public/img')));
  app.use('/views', express.static(path.join(__dirname, '../public/views')));

  // Rutas
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login.html'));
  });

  app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/admin_panel.html'));
  });


  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "../public/views/login.html");
    res.sendFile(indexPath);
  });

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
};

module.exports = { startServer };
