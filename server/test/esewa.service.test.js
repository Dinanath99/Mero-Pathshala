import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import {
  ESEWA_SANDBOX_GATEWAY_URL,
  ESEWA_SANDBOX_STATUS_CHECK_URL,
  ESEWA_SANDBOX_PRODUCT_CODE,
  ESEWA_SANDBOX_SECRET_KEY,
  validateEsewaSandboxConfig,
  generateEsewaSignature,
  buildEsewaPaymentPayload,
  decodeBase64ResponseData,
  verifyEsewaResponseSignature,
  verifyEsewaTransactionStatus,
} from "../services/esewa.service.js";

const TEST_SECRET = ESEWA_SANDBOX_SECRET_KEY;
const TEST_PRODUCT_CODE = ESEWA_SANDBOX_PRODUCT_CODE;

test("eSewa Service - Sandbox-Only Configuration Validation", async (t) => {
  const originalEnv = { ...process.env };

  t.afterEach(() => {
    process.env = { ...originalEnv };
  });

  await t.test("accepts official sandbox endpoints and defaults", () => {
    delete process.env.ESEWA_GATEWAY_URL;
    delete process.env.ESEWA_STATUS_CHECK_URL;
    delete process.env.ESEWA_PRODUCT_CODE;

    const config = validateEsewaSandboxConfig();
    assert.strictEqual(config.gatewayUrl, ESEWA_SANDBOX_GATEWAY_URL);
    assert.strictEqual(config.statusCheckUrl, ESEWA_SANDBOX_STATUS_CHECK_URL);
    assert.strictEqual(config.productCode, ESEWA_SANDBOX_PRODUCT_CODE);
  });

  await t.test("rejects production eSewa gateway URL and prevents payment requests", () => {
    process.env.ESEWA_GATEWAY_URL = "https://epay.esewa.com.np/api/epay/main/v2/form";

    assert.throws(
      () => validateEsewaSandboxConfig(),
      /Production endpoints are forbidden/
    );

    assert.throws(
      () =>
        buildEsewaPaymentPayload({
          amount: 500,
          transactionUuid: "MP-TXN-1",
        }),
      /Production endpoints are forbidden/
    );
  });

  await t.test("rejects production eSewa status verification URL", () => {
    process.env.ESEWA_STATUS_CHECK_URL =
      "https://epay.esewa.com.np/api/epay/transaction/status/";

    assert.throws(
      () => validateEsewaSandboxConfig(),
      /Production endpoints are forbidden/
    );
  });

  await t.test("rejects non-sandbox merchant product code", () => {
    process.env.ESEWA_PRODUCT_CODE = "LIVE_MERCHANT_123";

    assert.throws(
      () => validateEsewaSandboxConfig(),
      /strictly locked to SANDBOX ONLY/
    );
  });

  await t.test("verifyEsewaTransactionStatus safely rejects non-sandbox status verification URL", async () => {
    const res = await verifyEsewaTransactionStatus({
      productCode: "EPAYTEST",
      totalAmount: 500,
      transactionUuid: "MP-TXN-1",
      statusCheckUrl: "https://epay.esewa.com.np/api/epay/transaction/status/",
    });

    assert.strictEqual(res.isVerified, false);
    assert.strictEqual(res.status, "CONFIG_ERROR_NON_SANDBOX");
  });
});

test("eSewa Service - Signature Generation", async (t) => {
  await t.test("generates correct HMAC-SHA256 Base64 signature for valid input", () => {
    const totalAmount = "100";
    const transactionUuid = "test-uuid-12345";
    const productCode = TEST_PRODUCT_CODE;

    const signature = generateEsewaSignature({
      totalAmount,
      transactionUuid,
      productCode,
      secretKey: TEST_SECRET,
    });

    assert.ok(signature, "Signature should be generated");
    assert.strictEqual(typeof signature, "string");

    // Recalculate manually to verify HMAC-SHA256 Base64
    const expectedMessage = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    const expectedHash = crypto
      .createHmac("sha256", TEST_SECRET)
      .update(expectedMessage)
      .digest("base64");

    assert.strictEqual(signature, expectedHash);
  });

  await t.test("throws error when totalAmount is missing", () => {
    assert.throws(
      () =>
        generateEsewaSignature({
          transactionUuid: "test-uuid",
          productCode: TEST_PRODUCT_CODE,
          secretKey: TEST_SECRET,
        }),
      /totalAmount is required/
    );
  });

  await t.test("throws error when transactionUuid is missing", () => {
    assert.throws(
      () =>
        generateEsewaSignature({
          totalAmount: 100,
          productCode: TEST_PRODUCT_CODE,
          secretKey: TEST_SECRET,
        }),
      /transactionUuid is required/
    );
  });

  await t.test("rejects non-sandbox product code", () => {
    assert.throws(
      () =>
        generateEsewaSignature({
          totalAmount: 100,
          transactionUuid: "uuid-1",
          productCode: "INVALID_PROD_CODE",
          secretKey: TEST_SECRET,
        }),
      /Only sandbox code/
    );
  });
});

test("eSewa Service - Build Payment Payload", () => {
  const payload = buildEsewaPaymentPayload({
    amount: 500,
    transactionUuid: "MP-TXN-101",
    successUrl: "http://localhost:5173/payment/esewa/success",
    failureUrl: "http://localhost:5173/payment/esewa/failure",
  });

  assert.strictEqual(payload.gatewayUrl, ESEWA_SANDBOX_GATEWAY_URL);
  assert.strictEqual(payload.formData.amount, "500");
  assert.strictEqual(payload.formData.tax_amount, "0");
  assert.strictEqual(payload.formData.total_amount, "500");
  assert.strictEqual(payload.formData.transaction_uuid, "MP-TXN-101");
  assert.strictEqual(payload.formData.product_code, TEST_PRODUCT_CODE);
  assert.strictEqual(
    payload.formData.signed_field_names,
    "total_amount,transaction_uuid,product_code"
  );
  assert.ok(payload.formData.signature);
});

test("eSewa Service - Base64 Decoding", async (t) => {
  await t.test("successfully decodes valid Base64 JSON data", () => {
    const original = {
      status: "COMPLETE",
      total_amount: "500",
      transaction_uuid: "MP-12345",
      product_code: "EPAYTEST",
    };
    const encoded = Buffer.from(JSON.stringify(original)).toString("base64");

    const decoded = decodeBase64ResponseData(encoded);
    assert.deepStrictEqual(decoded, original);
  });

  await t.test("throws error on missing or invalid Base64 input", () => {
    assert.throws(() => decodeBase64ResponseData(null), /Invalid or missing/);
    assert.throws(() => decodeBase64ResponseData(""), /Invalid or missing/);
    assert.throws(
      () => decodeBase64ResponseData("not-a-valid-json-string"),
      /Failed to decode/
    );
  });
});

test("eSewa Service - Response Signature Verification", async (t) => {
  const sampleDecoded = {
    transaction_code: "TXN987654",
    status: "COMPLETE",
    total_amount: "500",
    transaction_uuid: "MP-UUID-999",
    product_code: "EPAYTEST",
    signed_field_names:
      "transaction_code,status,total_amount,transaction_uuid,product_code,signed_field_names",
  };

  // Generate valid response signature
  const fieldList = sampleDecoded.signed_field_names.split(",");
  const msg = fieldList
    .map((fieldName) => `${fieldName}=${sampleDecoded[fieldName]}`)
    .join(",");
  const validSignature = crypto
    .createHmac("sha256", TEST_SECRET)
    .update(msg)
    .digest("base64");

  sampleDecoded.signature = validSignature;

  await t.test("validates genuine response signature", () => {
    const isValid = verifyEsewaResponseSignature({
      decodedData: sampleDecoded,
      secretKey: TEST_SECRET,
    });
    assert.strictEqual(isValid, true);
  });

  await t.test("rejects tampered total_amount in response", () => {
    const tampered = { ...sampleDecoded, total_amount: "100" };
    const isValid = verifyEsewaResponseSignature({
      decodedData: tampered,
      secretKey: TEST_SECRET,
    });
    assert.strictEqual(isValid, false);
  });

  await t.test("rejects tampered transaction_uuid in response", () => {
    const tampered = { ...sampleDecoded, transaction_uuid: "MP-ATTACKER-UUID" };
    const isValid = verifyEsewaResponseSignature({
      decodedData: tampered,
      secretKey: TEST_SECRET,
    });
    assert.strictEqual(isValid, false);
  });

  await t.test("rejects tampered status in response", () => {
    const tampered = { ...sampleDecoded, status: "FAILED" };
    const isValid = verifyEsewaResponseSignature({
      decodedData: tampered,
      secretKey: TEST_SECRET,
    });
    assert.strictEqual(isValid, false);
  });

  await t.test("rejects forged or incorrect signature", () => {
    const forged = { ...sampleDecoded, signature: "forgedSignatureBase64==" };
    const isValid = verifyEsewaResponseSignature({
      decodedData: forged,
      secretKey: TEST_SECRET,
    });
    assert.strictEqual(isValid, false);
  });

  await t.test("rejects when signature or signed_field_names is missing", () => {
    assert.strictEqual(
      verifyEsewaResponseSignature({
        decodedData: { status: "COMPLETE" },
        secretKey: TEST_SECRET,
      }),
      false
    );
  });
});

test("eSewa Service - Server-to-Server Status Verification", async (t) => {
  await t.test("validates successful COMPLETE status response from provider", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        pid: "MP-12345",
        scd: "EPAYTEST",
        totalAmount: 500,
        status: "COMPLETE",
        refId: "ESEWA-REF-777",
      }),
    });

    try {
      const res = await verifyEsewaTransactionStatus({
        productCode: "EPAYTEST",
        totalAmount: 500,
        transactionUuid: "MP-12345",
      });

      assert.strictEqual(res.isVerified, true);
      assert.strictEqual(res.isComplete, true);
      assert.strictEqual(res.status, "COMPLETE");
      assert.strictEqual(res.refId, "ESEWA-REF-777");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await t.test("rejects status when provider returns PENDING", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        pid: "MP-12345",
        scd: "EPAYTEST",
        totalAmount: 500,
        status: "PENDING",
        refId: null,
      }),
    });

    try {
      const res = await verifyEsewaTransactionStatus({
        productCode: "EPAYTEST",
        totalAmount: 500,
        transactionUuid: "MP-12345",
      });

      assert.strictEqual(res.isVerified, false);
      assert.strictEqual(res.isComplete, false);
      assert.strictEqual(res.status, "PENDING");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await t.test("rejects status when provider returns CANCELED", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        pid: "MP-12345",
        scd: "EPAYTEST",
        totalAmount: 500,
        status: "CANCELED",
        refId: null,
      }),
    });

    try {
      const res = await verifyEsewaTransactionStatus({
        productCode: "EPAYTEST",
        totalAmount: 500,
        transactionUuid: "MP-12345",
      });

      assert.strictEqual(res.isVerified, false);
      assert.strictEqual(res.status, "CANCELED");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await t.test("rejects status when provider returns AMBIGUOUS", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        pid: "MP-12345",
        scd: "EPAYTEST",
        totalAmount: 500,
        status: "AMBIGUOUS",
        refId: null,
      }),
    });

    try {
      const res = await verifyEsewaTransactionStatus({
        productCode: "EPAYTEST",
        totalAmount: 500,
        transactionUuid: "MP-12345",
      });

      assert.strictEqual(res.isVerified, false);
      assert.strictEqual(res.status, "AMBIGUOUS");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await t.test("rejects status when provider returns amount mismatch", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        pid: "MP-12345",
        scd: "EPAYTEST",
        totalAmount: 100, // Mismatched
        status: "COMPLETE",
        refId: "ESEWA-REF-777",
      }),
    });

    try {
      const res = await verifyEsewaTransactionStatus({
        productCode: "EPAYTEST",
        totalAmount: 500, // Expected 500
        transactionUuid: "MP-12345",
      });

      assert.strictEqual(res.isVerified, false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await t.test("handles provider network error gracefully without crashing", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error("Connection refused");
    };

    try {
      const res = await verifyEsewaTransactionStatus({
        productCode: "EPAYTEST",
        totalAmount: 500,
        transactionUuid: "MP-12345",
      });

      assert.strictEqual(res.isVerified, false);
      assert.strictEqual(res.status, "NETWORK_ERROR");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
