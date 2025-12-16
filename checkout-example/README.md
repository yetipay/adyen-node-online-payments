# [Online Payments](https://docs.adyen.com/online-payments) Integration Demo - Sessions Flow

> **Note:**  
> This repository is a fork of the official [Adyen Node Online Payments](https://github.com/adyen-examples/adyen-node-online-payments/) examples repository, adapted for use with [yetipay](https://yetipay.me), an Adyen for Platforms partner.
>
> The fork is kept up to date with upstream. To see the minimal set of changes required for adaptation, [compare the branches](https://github.com/TableYeti/adyen-node-online-payments/compare/main...TableYeti:adyen-node-online-payments:feat/adapt-for-yetipay) on GitHub.

Checkout sample application using `Adyen.Web Drop-in/Components v6.x.x`, (see [folder /\_archive/v5](./_archive/v5) to access the previous version using `Adyen.Web Drop-in/Components v5.x.x`).

[![Node.js CI](https://github.com/adyen-examples/adyen-node-online-payments/actions/workflows/build-checkout.yml/badge.svg)](https://github.com/adyen-examples/adyen-node-online-payments/actions/workflows/build-checkout.yml)
[![E2E (Playwright)](https://github.com/adyen-examples/adyen-node-online-payments/actions/workflows/e2e-checkout.yml/badge.svg)](https://github.com/adyen-examples/adyen-node-online-payments/actions/workflows/e2e-checkout.yml)

# Description

This repository showcases a PCI-compliant integration of the **Sessions Flow**, the default integration that we recommend for merchants. Explore this simplified e-commerce demo to discover the code, libraries and configuration you need to enable various payment options in your checkout experience.

It includes a **NodeJS + Express** application that supports [Adyen Drop-in and Components](https://docs.adyen.com/online-payments/build-your-integration)
(ACH, Alipay, Cards, Dotpay, iDEAL, Klarna, PayPal, etc..) using the Adyen's API Library for Node.js ([GitHub](https://github.com/Adyen/adyen-node-api-library)).

> **Note:**
> For a three-steps [advanced use case](https://docs.adyen.com/online-payments/build-your-integration/additional-use-cases/) check out the **Advanced Flow** demo in the [`checkout-example-advanced`](../checkout-example-advanced) folder.

![Card checkout demo](public/images/cardcheckout.gif)

## Requirements

- [yetipay API credentials](https://docs.api.yetipay.me/TODO)
- Node.js 20+

## 1. Installation

```
git clone https://github.com/yetipay/adyen-node-online-payments.git
```

## 2. Set the environment variables

- [yetipay Base URL](https://docs.api.yetipay.me/TODO)
- [yetipay API key](https://docs.api.yetipay.me/TODO)
- [HMAC Key](https://docs.api.yetipay.me/TODO)

Create a `./.env` file with the environment variables.

```shell
export YETIPAY_API_BASE_URL=https://api.yetipay.me
export YETIPAY_API_KEY=yourYetipayApiKey
export ADYEN_HMAC_KEY=yourHmacKey
```

## 3. Configure allowed origins (CORS)

It is required to specify the domain or URL of the web applications that will make requests to Adyen.

Ensure your client key [is configured with](https://docs.api.yetipay.me/TODO) the domain of your web application. This example uses http://localhost:8080/

## 4. Run the application

```
cd checkout-example

npm install
npm run dev
```

Visit [http://localhost:8080/](http://localhost:8080/) to choose an integration type.

Try out the different payment methods with our [test card numbers](https://docs.adyen.com/development-resources/test-cards/test-card-numbers) and other payment method details.

# Webhooks

Webhooks deliver asynchronous notifications about the payment status and other events that are important to receive and process.

### Webhook setup

In Basecamp under the `Developers → Webhooks` section, [create](https://docs.api.yetipay.me/TODO) a new `Standard webhook`.

Copy the generated HMAC Key and set it as an environment variable. The application will use this to verify the [HMAC signatures](https://docs.adyen.com/development-resources/webhooks/verify-hmac-signatures/).

Make sure the webhook is **enabled**, so it can receive notifications.

### Expose an endpoint

This demo provides a simple webhook implementation exposed at `/api/webhooks/notifications` that shows you how to receive, validate and consume the webhook payload.

### Test your webhook

The following webhooks `events` should be enabled for this example app:

- **AUTHORISATION**
