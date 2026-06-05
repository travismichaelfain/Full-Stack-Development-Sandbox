import items from "../fakeDb.js";
import ExpressError from "../ExpressError.js";

export function getItems(req, res) {
  return res.json(items);
}

export function getItem(req, res) {
  const { name } = req.params;

  const foundItem = items.find((i) => i.name === name);

  if (!foundItem) {
    throw new ExpressError("Item not found", 404);
  }

  return res.json(foundItem);
}

export function addItem(req, res) {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    throw new ExpressError("Missing name or price", 400);
  }

  const newItem = { name, price };

  items.push(newItem);

  return res.status(201).json({ added: newItem });
}

export function updateItem(req, res) {
  const { name } = req.params;
  const { name: newName, price: newPrice } = req.body;
  const item = items.find((i) => i.name === name);

  if (!item) {
    throw new ExpressError("Item not found", 404);
  }

  if (newName !== undefined) item.name = newName;
  if (newPrice !== undefined) item.price = newPrice;

  return res.json({ updated: item });
}

export function deleteItem(req, res) {
  const { name } = req.params;
  const itemIndex = items.findIndex((i) => i.name === name);

  if (itemIndex === -1) {
    throw new ExpressError("Item not found", 404);
  }

  const deletedItem = items.splice(itemIndex, 1)[0];
  return res.json({ message: "Deleted" });
}
