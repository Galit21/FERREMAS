import express from "express";
import webpayRoutes from "./routes/webpay.routes.js";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/webpay', webpayRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
