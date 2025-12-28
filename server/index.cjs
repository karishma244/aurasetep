require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory orders store (for simulation only)
const orders = new Map();

app.post("/api/create-order", (req, res) => {
  const { amount, currency = "INR", items } = req.body;
  if (!amount) return res.status(400).json({ error: "Amount is required" });

  const id = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const order = {
    id,
    amount: Math.round(Number(amount)),
    currency,
    items: items || [],
    status: "created",
    createdAt: Date.now(),
  };

  orders.set(id, order);

  const server =
    process.env.SERVER_URL || `http://localhost:${process.env.PORT || 4242}`;
  res.json({
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    simulateUrl: `${server}/simulate/${order.id}`,
  });
});

app.post("/api/confirm-payment", (req, res) => {
  const { orderId } = req.body;
  const order = orders.get(orderId);
  if (!order) return res.status(404).json({ error: "Order not found" });

  order.status = "paid";
  order.paidAt = Date.now();
  orders.set(orderId, order);

  res.json({ success: true, orderId });
});

app.get("/api/order/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
});

app.get("/simulate/:id", (req, res) => {
  const id = req.params.id;
  const order = orders.get(id);
  if (!order) return res.status(404).send("Order not found");

  const html = `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Simulated Payment</title>
    <style>body{font-family:Arial,Helvetica,sans-serif;padding:24px}</style>
  </head>
  <body>
    <h2>Simulated Payment</h2>
    <p>Order: ${order.id}</p>
    <p>Amount: ₹${order.amount.toLocaleString()}</p>
    <button id="pay">Complete Payment</button>
    <script>
      document.getElementById('pay').addEventListener('click', async function(){
        try{
          const res = await fetch('/api/confirm-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: '${order.id}' })
          });
          const data = await res.json();
          if(data.success){
            if(window.opener){
              window.opener.postMessage({ type: 'SIMULATED_PAYMENT', status: 'paid', orderId: '${
                order.id
              }' }, '*');
            }
            document.body.innerHTML = '<h3>Payment successful</h3><p>You can close this window.</p>';
          } else {
            alert('Payment failed');
          }
        }catch(e){
          alert('Error confirming payment');
        }
      });
    </script>
  </body>
  </html>`;

  res.send(html);
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Payment simulator listening on ${PORT}`));
