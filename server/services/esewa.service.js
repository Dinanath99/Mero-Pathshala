import crypto from "crypto";

/**
 * Official eSewa ePay V2 Sandbox Constants (MeroPathsala is strictly SANDBOX ONLY)
 */
export const ESEWA_SANDBOX_GATEWAY_URL =
  "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
export const ESEWA_SANDBOX_STATUS_CHECK_URL =
  "https://uat.esewa.com.np/api/epay/transaction/status/";
export const ESEWA_SANDBOX_PRODUCT_CODE = "EPAYTEST";
export const ESEWA_SANDBOX_SECRET_KEY = "8gBm/:&EnhH.1/q";

/**
 * Validates that all eSewa configuration parameters target the official SANDBOX environment ONLY.
 * Fails safely by throwing a descriptive error if production or unrecognized endpoints are configured.
 * 
 * @returns {Object} Validated sandbox configuration
 */
export const validateEsewaSandboxConfig = () => {
  const configuredGateway = process.env.ESEWA_GATEWAY_URL;
  if (configuredGateway && configuredGateway.trim() !== ESEWA_SANDBOX_GATEWAY_URL) {
    throw new Error(
      `Invalid eSewa gateway URL: "${configuredGateway}". MeroPathsala is strictly locked to SANDBOX ONLY ("${ESEWA_SANDBOX_GATEWAY_URL}"). Production endpoints are forbidden.`
    );
  }

  const configuredStatusCheck = process.env.ESEWA_STATUS_CHECK_URL;
  if (
    configuredStatusCheck &&
    configuredStatusCheck.trim() !== ESEWA_SANDBOX_STATUS_CHECK_URL
  ) {
    throw new Error(
      `Invalid eSewa status verification URL: "${configuredStatusCheck}". MeroPathsala is strictly locked to SANDBOX ONLY ("${ESEWA_SANDBOX_STATUS_CHECK_URL}"). Production endpoints are forbidden.`
    );
  }

  const configuredProductCode = process.env.ESEWA_PRODUCT_CODE;
  if (
    configuredProductCode &&
    configuredProductCode.trim() !== ESEWA_SANDBOX_PRODUCT_CODE
  ) {
    throw new Error(
      `Invalid eSewa product code: "${configuredProductCode}". MeroPathsala is strictly locked to SANDBOX ONLY ("${ESEWA_SANDBOX_PRODUCT_CODE}").`
    );
  }

  return {
    gatewayUrl: ESEWA_SANDBOX_GATEWAY_URL,
    statusCheckUrl: ESEWA_SANDBOX_STATUS_CHECK_URL,
    productCode: ESEWA_SANDBOX_PRODUCT_CODE,
    secretKey: process.env.ESEWA_SECRET_KEY || ESEWA_SANDBOX_SECRET_KEY,
  };
};

/**
 * Generates an HMAC-SHA256 Base64-encoded signature for eSewa ePay V2 sandbox.
 * Official parameter order: total_amount,transaction_uuid,product_code
 * 
 * @param {Object} params
 * @param {string|number} params.totalAmount - Total transaction amount
 * @param {string} params.transactionUuid - Unique transaction identifier (alphanumeric & hyphen only)
 * @param {string} [params.productCode] - Sandbox merchant code (defaults to EPAYTEST)
 * @param {string} [params.secretKey] - Sandbox merchant secret key
 * @returns {string} Base64-encoded HMAC-SHA256 signature
 */
export const generateEsewaSignature = ({
  totalAmount,
  transactionUuid,
  productCode,
  secretKey,
}) => {
  if (totalAmount === undefined || totalAmount === null) {
    throw new Error("totalAmount is required to generate eSewa signature");
  }
  if (!transactionUuid) {
    throw new Error("transactionUuid is required to generate eSewa signature");
  }

  const resolvedProductCode = productCode || ESEWA_SANDBOX_PRODUCT_CODE;
  if (resolvedProductCode !== ESEWA_SANDBOX_PRODUCT_CODE) {
    throw new Error(
      `Invalid productCode "${resolvedProductCode}". Only sandbox code "${ESEWA_SANDBOX_PRODUCT_CODE}" is permitted.`
    );
  }

  const key = secretKey || process.env.ESEWA_SECRET_KEY || ESEWA_SANDBOX_SECRET_KEY;
  if (!key) {
    throw new Error("eSewa secretKey is required for signature generation");
  }

  // Exact format specified in official eSewa ePay V2 documentation:
  // total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${resolvedProductCode}`;

  const hmac = crypto.createHmac("sha256", key);
  hmac.update(message);
  return hmac.digest("base64");
};

/**
 * Builds the complete form payload and signature for eSewa ePay V2 sandbox POST submission.
 * Validates sandbox configuration before constructing payload.
 * 
 * @param {Object} params
 * @param {number} params.amount - Course amount
 * @param {string} params.transactionUuid - Unique transaction UUID
 * @param {string} [params.successUrl] - Return URL on success
 * @param {string} [params.failureUrl] - Return URL on failure
 * @returns {Object} { gatewayUrl, formData }
 */
export const buildEsewaPaymentPayload = ({
  amount,
  transactionUuid,
  successUrl,
  failureUrl,
}) => {
  // Validate configuration against production/invalid endpoints
  const config = validateEsewaSandboxConfig();

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const resolvedSuccessUrl =
    successUrl ||
    process.env.ESEWA_SUCCESS_URL ||
    `${clientUrl}/payment/esewa/success`;
  const resolvedFailureUrl =
    failureUrl ||
    process.env.ESEWA_FAILURE_URL ||
    `${clientUrl}/payment/esewa/failure`;

  const formattedAmount = String(amount);
  const signedFieldNames = "total_amount,transaction_uuid,product_code";

  const signature = generateEsewaSignature({
    totalAmount: formattedAmount,
    transactionUuid,
    productCode: config.productCode,
    secretKey: config.secretKey,
  });

  const formData = {
    amount: formattedAmount,
    tax_amount: "0",
    total_amount: formattedAmount,
    transaction_uuid: transactionUuid,
    product_code: config.productCode,
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: resolvedSuccessUrl,
    failure_url: resolvedFailureUrl,
    signed_field_names: signedFieldNames,
    signature,
  };

  return {
    gatewayUrl: config.gatewayUrl,
    formData,
  };
};

/**
 * Safely decodes the Base64-encoded response data from eSewa.
 * 
 * @param {string} encodedData - Base64 string from query parameter `data`
 * @returns {Object} Decoded JSON object
 */
export const decodeBase64ResponseData = (encodedData) => {
  if (!encodedData || typeof encodedData !== "string") {
    throw new Error("Invalid or missing Base64 encoded eSewa response data");
  }

  try {
    const jsonString = Buffer.from(encodedData, "base64").toString("utf-8");
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Decoded eSewa payload is not an object");
    }
    return parsed;
  } catch (error) {
    throw new Error(`Failed to decode eSewa response data: ${error.message}`);
  }
};

/**
 * Validates the eSewa response signature using the exact `signed_field_names` returned by eSewa.
 * Kept strictly on the backend with the merchant secret key.
 * 
 * @param {Object} params
 * @param {Object} params.decodedData - Decoded eSewa response JSON
 * @param {string} [params.secretKey] - Sandbox merchant secret key
 * @returns {boolean} True if signature is cryptographically valid
 */
export const verifyEsewaResponseSignature = ({ decodedData, secretKey }) => {
  if (!decodedData || !decodedData.signature || !decodedData.signed_field_names) {
    return false;
  }

  const key = secretKey || process.env.ESEWA_SECRET_KEY || ESEWA_SANDBOX_SECRET_KEY;
  if (!key) {
    return false;
  }

  try {
    // signed_field_names is a comma-separated list of fields in the order they were signed
    // Example: "transaction_code,status,total_amount,transaction_uuid,product_code,signed_field_names"
    const signedFieldList = decodedData.signed_field_names
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    if (signedFieldList.length === 0) {
      return false;
    }

    // Reconstruct the message string: key1=val1,key2=val2,...
    const messageParts = signedFieldList.map((fieldName) => {
      const val = decodedData[fieldName];
      return `${fieldName}=${val !== undefined && val !== null ? val : ""}`;
    });
    const message = messageParts.join(",");

    const hmac = crypto.createHmac("sha256", key);
    hmac.update(message);
    const expectedSignature = hmac.digest("base64");

    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(decodedData.signature);

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch (error) {
    console.error("Error during eSewa response signature verification:", error);
    return false;
  }
};

/**
 * Performs server-to-server transaction-status check with eSewa SANDBOX API.
 * 
 * Official sandbox endpoint:
 * https://uat.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=100&transaction_uuid=123
 * 
 * Enforces sandbox-only verification. Fails safely if non-sandbox endpoint is attempted.
 * 
 * @param {Object} params
 * @param {string} params.productCode - Sandbox merchant code (EPAYTEST)
 * @param {string|number} params.totalAmount - Expected amount
 * @param {string} params.transactionUuid - Transaction UUID
 * @param {string} [params.statusCheckUrl] - Optional URL override (must be sandbox)
 * @returns {Promise<{ isVerified: boolean, isComplete: boolean, status: string, refId: string|null, raw: Object }>}
 */
export const verifyEsewaTransactionStatus = async ({
  productCode,
  totalAmount,
  transactionUuid,
  statusCheckUrl,
}) => {
  const targetUrl =
    statusCheckUrl ||
    process.env.ESEWA_STATUS_CHECK_URL ||
    ESEWA_SANDBOX_STATUS_CHECK_URL;

  // Strict sandbox endpoint verification
  if (targetUrl.trim() !== ESEWA_SANDBOX_STATUS_CHECK_URL) {
    console.error(`Attempt to use non-sandbox status verification URL rejected: ${targetUrl}`);
    return {
      isVerified: false,
      isComplete: false,
      status: "CONFIG_ERROR_NON_SANDBOX",
      refId: null,
      raw: { error: `Production endpoints forbidden. Expected ${ESEWA_SANDBOX_STATUS_CHECK_URL}` },
    };
  }

  const resolvedProductCode = productCode || ESEWA_SANDBOX_PRODUCT_CODE;
  if (resolvedProductCode !== ESEWA_SANDBOX_PRODUCT_CODE) {
    return {
      isVerified: false,
      isComplete: false,
      status: "CONFIG_ERROR_INVALID_CODE",
      refId: null,
      raw: { error: `Only sandbox product code '${ESEWA_SANDBOX_PRODUCT_CODE}' is permitted.` },
    };
  }

  const url = new URL(targetUrl);
  url.searchParams.set("product_code", String(resolvedProductCode));
  url.searchParams.set("total_amount", String(totalAmount));
  url.searchParams.set("transaction_uuid", String(transactionUuid));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url.toString(), {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      return {
        isVerified: false,
        isComplete: false,
        status: `HTTP_${response.status}`,
        refId: null,
        raw: { status: response.status, errorText },
      };
    }

    const data = await response.json();

    const isComplete = data?.status === "COMPLETE";
    const productMatches =
      !data.scd || String(data.scd).trim() === String(resolvedProductCode).trim();
    const pidMatches =
      !data.pid || String(data.pid).trim() === String(transactionUuid).trim();
    const amountMatches =
      data.totalAmount !== undefined
        ? Number(data.totalAmount) === Number(totalAmount)
        : true;

    const isVerified = isComplete && productMatches && pidMatches && amountMatches;

    return {
      isVerified,
      isComplete,
      status: data?.status || "UNKNOWN",
      refId: data?.refId || null,
      raw: data,
    };
  } catch (error) {
    console.error("eSewa sandbox transaction status check network error:", error.message);
    return {
      isVerified: false,
      isComplete: false,
      status: error.name === "AbortError" ? "TIMEOUT" : "NETWORK_ERROR",
      refId: null,
      raw: { error: error.message },
    };
  }
};
