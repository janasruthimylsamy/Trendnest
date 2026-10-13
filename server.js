
const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");
const helmet = require("helmet");
const crypto = require("crypto");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(express.json({ limit: "20kb" }));

const allowedOrigins = (
  process.env.CLIENT_ORIGIN || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Permit requests without an Origin header, such as local health checks.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);

// The database file remains on disk between server restarts.
const db = new Database(path.join(__dirname, "trendnest.sqlite"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address_line TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    notes TEXT,
    subtotal INTEGER NOT NULL,
    delivery_fee INTEGER NOT NULL,
    total INTEGER NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'COD',
    payment_status TEXT NOT NULL DEFAULT 'PAY_ON_DELIVERY',
    order_status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    unit_price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    line_total INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
  );
`);

// Server-side prices are authoritative.
// Never trust product names, prices, totals, or discounts sent by the browser.
const catalog = {
  1: { name: "Cloud Nine Tote Bag", price: 399 },
  2: { name: "Everyday Gold Hoops", price: 249 },
  3: { name: "Rose Glow Lip Tint", price: 299 },
  4: { name: "Minimal Ceramic Mug", price: 349 },
  5: { name: "Pastel Daily Planner", price: 199 },
  6: { name: "Classic White Sneakers", price: 899 },
  7: { name: "Soft Knit Cardigan", price: 799 },
  8: { name: "Pearl Charm Bracelet", price: 299 },
  9: { name: "Everyday Crossbody", price: 699 },
  10: { name: "Hydrating Face Serum", price: 399 },
  11: { name: "Scented Candle", price: 279 },
  12: { name: "Pastel Sticky Notes", price: 99 },
  13: { name: "Ribbed Everyday Top", price: 449 },
  14: { name: "Layered Gold Necklace", price: 349 },
  15: { name: "Satin Scrunchie Set", price: 149 },
  16: { name: "Blush Makeup Pouch", price: 249 },
  17: { name: "Decorative Flower Vase", price: 499 },
  18: { name: "Premium Gel Pens", price: 179 },
  19: { name: "Weekend Shoulder Bag", price: 749 },
  20: { name: "Dainty Heart Earrings", price: 199 },
  21: { name: "Daily Moisturizer", price: 349 },
  22: { name: "Cozy Cushion Cover", price: 299 },
  23: { name: "Aesthetic Journal", price: 249 },
  24: { name: "Classic Sunglasses", price: 399 },
  25: { name: "Floral Summer Dress", price: 999 },
  26: { name: "Stackable Ring Set", price: 299 },
  27: { name: "Velvet Hair Bow", price: 129 },
  28: { name: "Lip Care Duo", price: 199 },
  29: { name: "Tabletop Planter", price: 349 },
  30: { name: "Weekly Desk Planner", price: 199 },
  31: { name: "Everyday Denim Jacket", price: 1199 },
  32: { name: "Mini Pearl Necklace", price: 399 },
  33: { name: "Quilted Mini Purse", price: 549 },
  34: { name: "Makeup Brush Set", price: 449 },
  35: { name: "Soft Throw Blanket", price: 899 },
  36: { name: "Colourful Highlighters", price: 149 },
  37: { name: "Relaxed Cotton Shirt", price: 699 },
  38: { name: "Golden Charm Anklet", price: 249 },
  39: { name: "Canvas Mini Backpack", price: 799 },
  40: { name: "Gentle Face Cleanser", price: 299 },
  41: { name: "Minimal Wall Print", price: 399 },
  42: { name: "Study Essentials Kit", price: 349 },
  43: { name: "Pleated Midi Skirt", price: 749 },
  44: { name: "Floral Stud Earrings", price: 199 },
  45: { name: "Everyday Wallet", price: 349 },
  46: { name: "Nourishing Hand Cream", price: 179 },
  47: { name: "Ribbed Glass Tumbler", price: 249 },
  48: { name: "Pastel Bookmark Set", price: 99 },
  49: { name: "Linen Everyday Trousers", price: 899 },
  50: { name: "Twisted Gold Ring", price: 349 },
  51: { name: "Travel Makeup Case", price: 399 },
  52: { name: "Rose Water Mist", price: 249 },
  53: { name: "Decorative Trinket Tray", price: 299 },
  54: { name: "Daily Wear Ring Set", price: 299 },
  55: { name: "Lilac Shoulder Bag", price: 649 },
  56: { name: "Soft Lounge Set", price: 999 },
  57: { name: "Pearl Drop Earrings", price: 329 },
  58: { name: "Vanilla Scent Candle", price: 299 },
  59: { name: "Tinted Lip Balm", price: 199 },
  60: { name: "Creative Notes Bundle", price: 249 },
};

const DELIVERY_FEE = 0;

const insertOrder = db.prepare(`
  INSERT INTO orders (
    order_number, customer_name, phone, email,
    address_line, city, state, postal_code, notes,
    subtotal, delivery_fee, total,
    payment_method, payment_status, order_status
  ) VALUES (
    @order_number, @customer_name, @phone, @email,
    @address_line, @city, @state, @postal_code, @notes,
    @subtotal, @delivery_fee, @total,
    'COD', 'PAY_ON_DELIVERY', 'PENDING'
  )
`);

const insertItem = db.prepare(`
  INSERT INTO order_items (
    order_id, product_id, product_name, unit_price, quantity, line_total
  ) VALUES (?, ?, ?, ?, ?, ?)
`);

const saveOrder = db.transaction(({ customer, items, totals, orderNumber }) => {
  const result = insertOrder.run({
    order_number: orderNumber,
    customer_name: customer.name,
    phone: customer.phone,
    email: customer.email || null,
    address_line: customer.address,
    city: customer.city,
    state: customer.state,
    postal_code: customer.postalCode,
    notes: customer.notes || null,
    subtotal: totals.subtotal,
    delivery_fee: totals.deliveryFee,
    total: totals.total,
  });

  for (const item of items) {
    insertItem.run(
      result.lastInsertRowid,
      item.id,
      item.name,
      item.price,
      item.quantity,
      item.price * item.quantity
    );
  }

  return result.lastInsertRowid;
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "TrendNest orders" });
});

app.post("/api/orders", (req, res) => {
  try {
    const body = req.body || {};
    const customer = body.customer || {};
    const incomingItems = body.items;

    const name = String(customer.name || "").trim();
    const phone = String(customer.phone || "").replace(/[\s-]/g, "");
    const email = String(customer.email || "").trim();
    const address = String(customer.address || "").trim();
    const city = String(customer.city || "").trim();
    const state = String(customer.state || "").trim();
    const postalCode = String(customer.postalCode || "").trim();
    const notes = String(customer.notes || "").trim();

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: "Enter your full name." });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        error: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    if (
      address.length < 5 || address.length > 250 ||
      city.length < 2 || city.length > 100 ||
      state.length < 2 || state.length > 100 ||
      !/^\d{6}$/.test(postalCode)
    ) {
      return res.status(400).json({
        error: "Enter a complete address, city, state and 6-digit PIN code.",
      });
    }

    if (notes.length > 500) {
      return res.status(400).json({ error: "Delivery notes are too long." });
    }

    if (!Array.isArray(incomingItems) || incomingItems.length < 1 || incomingItems.length > 60) {
      return res.status(400).json({ error: "Your bag is empty or invalid." });
    }

    const seen = new Set();
    const items = [];

    for (const entry of incomingItems) {
      const id = Number(entry.id);
      const quantity = Number(entry.quantity);
      const product = catalog[id];

      if (
        !Number.isSafeInteger(id) ||
        !product ||
        !Number.isSafeInteger(quantity) ||
        quantity < 1 ||
        quantity > 20 ||
        seen.has(id)
      ) {
        return res.status(400).json({
          error: "One or more products or quantities are invalid. Please refresh your bag.",
        });
      }

      seen.add(id);
      items.push({ id, name: product.name, price: product.price, quantity });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + DELIVERY_FEE;

    if (!Number.isSafeInteger(total) || total <= 0) {
      return res.status(400).json({ error: "The order total is invalid." });
    }

    const orderNumber = `TN-${crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()}`;

    const orderId = saveOrder({
      customer: { name, phone, email, address, city, state, postalCode, notes },
      items,
      totals: { subtotal, deliveryFee: DELIVERY_FEE, total },
      orderNumber,
    });

    return res.status(201).json({
      message: "Your COD order has been placed.",
      order: {
        orderNumber,
        status: "PENDING",
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pay on delivery",
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          lineTotal: item.price * item.quantity,
        })),
      },
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return res.status(500).json({
      error: "We couldn't place your order. Please try again.",
    });
  }
});

// Simple admin-only listing for local development.
// Set ADMIN_TOKEN before using this endpoint and keep it secret.
app.get("/api/admin/orders", (req, res) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token || req.get("x-admin-token") !== token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const orders = db.prepare(`
    SELECT * FROM orders ORDER BY id DESC LIMIT 200
  `).all();

  const getItems = db.prepare(`
    SELECT product_id AS productId, product_name AS name,
           unit_price AS price, quantity, line_total AS lineTotal
    FROM order_items WHERE order_id = ?
  `);

  res.json({
    orders: orders.map((order) => ({
      ...order,
      items: getItems.all(order.id),
    })),
  });
});

app.use((err, req, res, next) => {
  if (err.message === "Origin not allowed by CORS") {
    return res.status(403).json({ error: "This website origin is not allowed." });
  }
  console.error(err);
  res.status(500).json({ error: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`TrendNest API running on http://localhost:${PORT}`);
});
