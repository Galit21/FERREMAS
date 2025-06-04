const { Options } = require("transbank-sdk");

const webpayOptions = new Options(
  "597055555532", // Código de comercio de prueba
  "Transbank12345678", // API key de prueba
  "https://webpay3g.transbank.cl"
);

module.exports = webpayOptions;
