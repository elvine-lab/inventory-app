const express = require("express");
const path = require("path");
const app = express();
const db = require("./db/query");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// API endpoints
app.get("/api/categories", async (req, res) => {
  const result = await db.getCategories();
  res.json(result.rows);
});

app.get("/api/categories/:id/items", async (req, res) => {
  const result = await db.getItemsByCategory(req.params.id);
  res.json(result.rows);
});

app.post("/api/categories", async (req, res) => {
  const { name } = req.body;
  await db.createCategory(name);
  res.json({ message: "Category added" });
});

app.post("/api/items", async (req, res) => {
  const { name, description, price, image_url, quantity, category_id } = req.body;
  await db.createItem(name, description, price, image_url, quantity, category_id);
  res.json({ message: "Item added" });
});

app.delete("/api/items/:id", async (req, res) => {
  await db.deleteItem(req.params.id);
  res.json({ message: "Item deleted" });
});

app.delete("/api/categories/:id", async (req, res) => {
  await db.deleteCategory(req.params.id);
  res.json({ message: "Category deleted" });
});

const PORT = 2608;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
