async function fetchCategories() {
  const res = await fetch("/api/categories");
  const categories = await res.json();
  const container = document.getElementById("categories");
  container.innerHTML = "";

  for (const cat of categories) {
    const div = document.createElement("div");
    div.className = "category";
    div.innerHTML = `
      <h2>${cat.name} <button onclick="deleteCategory(${cat.id})">🗑️</button></h2>
      <form onsubmit="addItem(event, ${cat.id})">
        <input name="name" placeholder="Part name" required>
        <input name="price" type="number" placeholder="Price" step="0.01" required>
        <input name="image_url" placeholder="Image URL">
        <input name="description" placeholder="Description">
        <input name="quantity" type="number" placeholder="Qty" required>
        <button type="submit">Add Item</button>
      </form>
      <div id="items-${cat.id}">Loading items...</div>
    `;
    container.appendChild(div);
    loadItems(cat.id);
  }
}

async function loadItems(categoryId) {
  const res = await fetch(`/api/categories/${categoryId}/items`);
  const items = await res.json();
  const container = document.getElementById(`items-${categoryId}`);
  container.innerHTML = items.map(item => `
    <div class="item">
      <img src="${item.image_url}" alt="${item.name}">
      <p><strong>${item.name}</strong> - $${item.price}</p>
      <p>${item.description}</p>
      <p>Qty: ${item.quantity}</p>
      <button onclick="deleteItem(${item.id}, ${categoryId})">🗑️ Delete</button>
    </div>
  `).join('');
}

async function addCategory() {
  const input = document.getElementById("newCategory");
  await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: input.value })
  });
  input.value = "";
  fetchCategories();
}

async function addItem(event, categoryId) {
  event.preventDefault();
  const form = event.target;
  const data = {
    name: form.name.value,
    price: form.price.value,
    image_url: form.image_url.value,
    description: form.description.value,
    quantity: form.quantity.value,
    category_id: categoryId
  };
  await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  form.reset();
  loadItems(categoryId);
}

async function deleteItem(id, categoryId) {
  await fetch(`/api/items/${id}`, { method: "DELETE" });
  loadItems(categoryId);
}

async function deleteCategory(id) {
  await fetch(`/api/categories/${id}`, { method: "DELETE" });
  fetchCategories();
}

window.onload = fetchCategories;
