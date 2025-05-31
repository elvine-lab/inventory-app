const pool = require("../routes/pool");

module.exports = {
  getCategories: () => pool.query("SELECT * FROM categories ORDER BY id"),
  getItemsByCategory: (id) => pool.query("SELECT * FROM items WHERE category_id = $1", [id]),
  createCategory: (name) => pool.query("INSERT INTO categories (name) VALUES ($1)", [name]),
  createItem: (name, description, price, image_url, quantity, category_id) =>
    pool.query(
      "INSERT INTO items (name, description, price, image_url, quantity, category_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, description, price, image_url, quantity, category_id]
    ),
  deleteItem: (id) => pool.query("DELETE FROM items WHERE id = $1", [id]),
  deleteCategory: (id) => pool.query("DELETE FROM categories WHERE id = $1", [id])
};
