import transbank from "transbank-sdk";
const {
  WebpayPlus,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} = transbank;

export async function crearTransaccion(req, res) {
  try {
    const buyOrder = "orden-" + Math.floor(Math.random() * 1000000);
    const sessionId = "sesion-" + Math.floor(Math.random() * 1000000);
    const amount = 10000;
    const returnUrl = "http://localhost:3000/webpay/respuesta";

    // ✅ Configuración de pruebas manual
    const options = new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    );

    const transaction = new WebpayPlus.Transaction(options);
    const response = await transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    console.log("[Webpay] Transacción creada:", response);
    res.redirect(`${response.url}?token_ws=${response.token}`);
  } catch (error) {
    console.error("[ERROR crearTransaccion]", error);
    res.status(500).send("Error al crear la transacción Webpay");
  }
}

export async function confirmarTransaccion(req, res) {
  try {
    const token = req.query.token_ws;

    const options = new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    );

    const transaction = new WebpayPlus.Transaction(options);
    const result = await transaction.commit(token);

    if (result.response_code === 0) {
      res.send(`✅ Pago exitoso. Orden: ${result.buy_order}`);
    } else {
      res.send(`❌ Pago fallido. Código: ${result.response_code}`);
    }
  } catch (error) {
    console.error("[ERROR confirmarTransaccion]", error);
    res.status(500).send("Error al confirmar la transacción Webpay");
  }
}
