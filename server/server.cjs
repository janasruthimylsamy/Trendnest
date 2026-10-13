
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const Database = require("better-sqlite3");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 4000;

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "100kb" }));

const dataDir = path.join(__dirname, "data");
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "trendnest.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    pincode TEXT NOT NULL,
    total REAL NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Placed',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id)
  );
`);

const saveOrder = db.transaction((order, items) => {
  db.prepare(`
    INSERT INTO orders
    (id, customer_name, email, phone, address, city, pincode,
     total, payment_method, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    order.id,
    order.name,
    order.email,
    order.phone,
    order.address,
    order.city,
    order.pincode,
    order.total,
    "COD",
    "Placed",
    new Date().toISOString()
  );

  const insertItem = db.prepare(`
    INSERT INTO order_items
    (order_id, product_id, product_name, quantity, price)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const item of items) {
    insertItem.run(
      order.id,
      String(item.productId),
      item.name,
      item.quantity,
      item.price
    );
  }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "TrendNest orders" });
});

app.post("/api/orders", (req, res) => {
  try {
    const {
      name, email, phone, address, city, pincode, items
    } = req.body || {};

    if (
      !name?.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "") ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !/^\d{6}$/.test(pincode || "") ||
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 60
    ) {
      return res.status(400).json({
        error: "Please provide valid customer and order details."
      });
    }

    const cleanItems = [];
    let total = 0;

    for (const item of items) {
      const productId = String(item.productId ?? item.id ?? "");
      const quantity = Number(item.quantity);
      const price = Number(item.price);
      const productName = String(item.name || "").trim();

      if (
        !productId ||
        !productName ||
        productName.length > 200 ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20 ||
        !Number.isFinite(price) ||
        price <= 0 ||
        price > 1000000
      ) {
        return res.status(400).json({
          error: "One or more cart items are invalid."
        });
      }

      cleanItems.push({
        productId,
        name: productName,
        quantity,
        price
      });

      total += price * quantity;
    }

    if (!Number.isFinite(total) || total <= 0) {
      return res.status(400).json({ error: "Invalid order total." });
    }

    const order = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      pincode,
      total: Math.round(total * 100) / 100
    };

    saveOrder(order, cleanItems);

    res.status(201).json({
      ok: true,
      message: "Order placed successfully.",
      orderId: order.id,
      total: order.total,
      paymentMethod: "COD"
    });
  } catch (error) {
    console.error("Order error:", error.message);
    res.status(500).json({ error: "Unable to save your order." });
  }
});

app.get("/api/admin/orders", (req, res) => {
  const token = process.env.ADMIN_TOKEN;

  if (!token || req.get("Authorization") !== `Bearer ${token}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const orders = db.prepare(`
    SELECT * FROM orders ORDER BY created_at DESC
  `).all();

  const getItems = db.prepare(`
    SELECT product_id, product_name, quantity, price
    FROM order_items WHERE order_id = ?
  `);

  res.json(
    orders.map(order => ({
      ...order,
      items: getItems.all(order.id)
    }))
  );
});

app.listen(PORT, () => {
  console.log(`TrendNest backend running at http://localhost:${PORT}`);
});
