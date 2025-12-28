# Payment Setup (Razorpay)

This project includes a minimal payment server and frontend integration using a simulated checkout flow (no real payments).

## Files added

- `server/index.js` — Express server endpoint `/api/create-order` to create a simulated order and `/simulate/:id` page to complete a fake payment.
- `src/pages/Checkout.tsx` — Checkout UI and payment button that opens the simulator page and listens for completion.

## Environment

Create a `.env` in project root with:

```
PORT=4242
```

Also set frontend env for Vite (optional) in `.env`:

```
VITE_PAYMENT_SERVER_URL=http://localhost:4242
```

Keep these values secret. `RAZORPAY_KEY_ID` is safe to embed in frontend only as publishable key; `RAZORPAY_KEY_SECRET` must stay server-side.

## Install server dependencies

Run (from project root):

```bash
npm install express cors dotenv
```

If you'd like to run both the server and Vite concurrently, install `concurrently`:

```bash
npm install -D concurrently
```

Add a script to `package.json` (optional):

```json
"scripts": {
  "dev:server": "node server/index.js",
  "dev:full": "concurrently \"npm run dev:server\" \"npm run dev\""
}
```

## Run locally

1. Create a `.env` file with `PORT=4242` (optional `VITE_PAYMENT_SERVER_URL` documented below).
2. Start the simulated payment server:

```bash
npm run dev:server
```

3. In another terminal, start Vite:

```bash
npm run dev
```

4. Open the app at the port shown by Vite (e.g., `http://localhost:8081`) and go to `/cart` → `Proceed to Checkout`. A simulator popup will open — click "Complete Payment" to simulate a successful payment.

## Notes

- This is a minimal local integration for testing. For production, secure your server endpoints, verify payment signatures on server-side, and persist order/payment state.
- If you prefer Stripe instead of Razorpay, I can scaffold a Stripe-based flow instead.
