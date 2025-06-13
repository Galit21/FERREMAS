import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import * as controller from "../controllers/webpay.controller.js";
import transbank from "transbank-sdk";

describe("Webpay controller", () => {
  it("crearTransaccion redirige con token", async () => {
    const fakeCreate = mock.fn(() =>
      Promise.resolve({ url: "https://webpay", token: "tok123" })
    );
    const OriginalTransaction = transbank.WebpayPlus.Transaction;
    transbank.WebpayPlus.Transaction = class {
      constructor() {
        this.create = fakeCreate;
      }
    };
    const req = { body: { amount: "1000" } };
    let redirected;
    const res = {
      redirect: (url) => {
        redirected = url;
      },
    };

    await controller.crearTransaccion(req, res);

    assert.strictEqual(fakeCreate.mock.calls.length, 1);
    assert.strictEqual(redirected, "https://webpay?token_ws=tok123");

    transbank.WebpayPlus.Transaction = OriginalTransaction;
  });

  it("confirmarTransaccion envia mensaje de exito", async () => {
    const fakeCommit = mock.fn(() =>
      Promise.resolve({ response_code: 0, buy_order: "orden-123" })
    );
    const OriginalTransaction = transbank.WebpayPlus.Transaction;
    transbank.WebpayPlus.Transaction = class {
      constructor() {
        this.commit = fakeCommit;
      }
    };
    const req = { query: { token_ws: "abc" } };
    let message;
    const res = {
      send: (msg) => {
        message = msg;
      },
    };

    await controller.confirmarTransaccion(req, res);

    assert.strictEqual(fakeCommit.mock.calls.length, 1);
    assert.strictEqual(message, "✅ Pago exitoso. Orden: orden-123");

    transbank.WebpayPlus.Transaction = OriginalTransaction;
  });
});
