/**
 * YetipayPaymentsApi - Shared utility class for interacting with Yetipay Payments API
 */
class YetipayPaymentsApi {
  constructor(apiBaseUrl, apiKey, siteId) {
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
    this.siteId = siteId;
    this._clientKey = undefined;
  }

  /**
   * Get common headers for all API requests
   */
  getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  async getClientKey() {
    if (this._clientKey !== undefined) {
      return this._clientKey;
    }
    const response = await fetch(`${this.apiBaseUrl}/config`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    const config = await response.json();
    this._clientKey = config.clientToken;
    return this._clientKey;
  }
  /**
   * Create a payment session
   * @param {Object} sessionData - Session data including amount, returnUrl, reference, merchantAccount, countryCode
   * @returns {Promise<Object>} Session response
   */
  async sessions(sessionData) {
    const response = await fetch(`${this.apiBaseUrl}/${this.siteId}/sessions`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Get available payment methods
   * @param {Object} paymentMethodsData - Payment methods request data including merchantAccount, countryCode, amount
   * @returns {Promise<Object>} Payment methods response
   */
  async paymentMethods(paymentMethodsData) {
    const response = await fetch(`${this.apiBaseUrl}/${this.siteId}/payment-methods`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(paymentMethodsData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Make a payment
   * @param {Object} paymentData - Payment data including payment details, countryCode, merchantAccount, returnUrl, reference, amount
   * @returns {Promise<Object>} Payment response
   */
  async payments(paymentData) {
    const response = await fetch(`${this.apiBaseUrl}/${this.siteId}/payments`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Submit additional payment details (e.g., for 3DS authentication)
   * @param {Object} details - Additional details for the payment
   * @returns {Promise<Object>} Payment details response
   */
  async paymentsDetails(details) {
    const response = await fetch(`${this.apiBaseUrl}/${this.siteId}/payments/details`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(details),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Update the authorised amount of a payment
   * @param {string} pspReference - Payment PSP reference
   * @param {Object} updateData - Update data including amount, reference, etc.
   * @returns {Promise<Object>} Update response
   */
  async updateAuthorisedAmount(pspReference, updateData) {
    const response = await fetch(`${this.apiBaseUrl}/${this.siteId}/payments/amount-updates`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        pspReference,
        ...updateData,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Capture an authorised payment
   * @param {string} pspReference - Payment PSP reference
   * @param {Object} captureData - Capture data including amount, reference, etc.
   * @returns {Promise<Object>} Capture response
   */
  async captureAuthorisedPayment(pspReference, captureData) {
    const response = await fetch(`${this.apiBaseUrl}/${this.siteId}/payments/captures`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        pspReference,
        ...captureData,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Refund or cancel a payment
   * @param {string} pspReference - Payment PSP reference
   * @param {Object} refundData - Refund data including amount, reference, etc.
   * @returns {Promise<Object>} Refund/cancel response
   */
  async refundOrCancelPayment(pspReference, refundData) {
    const response = await fetch(`${this.apiBaseUrl}/${this.siteId}/payments/reversals`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        pspReference,
        ...refundData,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }
}

module.exports = YetipayPaymentsApi;
