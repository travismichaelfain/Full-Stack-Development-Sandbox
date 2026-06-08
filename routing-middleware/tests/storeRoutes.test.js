import request from "supertest";
import app from "../app.js";
import items from "../fakeDb.js";

beforeEach(() => {
  // Reset the items array before each test
  items.length = 0;
  items.push({ name: "apple", price: 1.0 });
});

describe("GET /store", () => {
  test("should return all items", async () => {
    const res = await request(app).get("/store");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "apple", price: 1.0 }]);
  });
});

describe("GET /store/:name", () => {
  test("should return the item if it exists", async () => {
    const res = await request(app).get("/store/apple");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "apple", price: 1.0 });
  });

  test("should return 404 if the item does not exist", async () => {
    const res = await request(app).get("/store/banana");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});

describe("POST /store", () => {
  test("should add a new item", async () => {
    const res = await request(app)
      .post("/store")
      .send({ name: "banana", price: 0.5 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "banana", price: 0.5 } });
    expect(items.length).toBe(2);
  });

  test("should return 400 if name or price is missing", async () => {
    const res = await request(app).post("/store").send({ name: "orange" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing name or price" });
  });
});

describe("PATCH /store/:name", () => {
  test("should update an existing item", async () => {
    const res = await request(app).patch("/store/apple").send({ price: 1.5 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: "apple", price: 1.5 } });
    expect(items[0].price).toBe(1.5);
  });

  test("should return 404 if the item does not exist", async () => {
    const res = await request(app).patch("/store/banana").send({ price: 0.5 });
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});

describe("DELETE /store/:name", () => {
  test("should delete an existing item", async () => {
    const res = await request(app).delete("/store/apple");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
    expect(items.length).toBe(0);
  });

  test("should return 404 if the item does not exist", async () => {
    const res = await request(app).delete("/store/banana");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});
