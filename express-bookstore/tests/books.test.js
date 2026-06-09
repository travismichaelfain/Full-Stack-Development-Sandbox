import request from "supertest";
import app from "../app.js";
import db from "../db.js";

const testBook = {
  isbn: "1234567890",
  amazon_url: "http://amazon.com/book1",
  author: "Author One",
  language: "English",
  pages: 100,
  publisher: "Publisher One",
  title: "Book One",
  year: 2000,
};

beforeEach(async () => {
  await db.query("DELETE FROM books");

  await db.query(
    `INSERT INTO books
      (isbn, amazon_url, author, language, pages, publisher, title, year)
     VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      testBook.isbn,
      testBook.amazon_url,
      testBook.author,
      testBook.language,
      testBook.pages,
      testBook.publisher,
      testBook.title,
      testBook.year,
    ],
  );
});

afterEach(async () => {
  await db.query("DELETE FROM books");
});

afterAll(async () => {
  await db.end();
});

describe("GET /books", () => {
  test("returns array of books", async () => {
    const res = await request(app).get("/books");

    expect(res.statusCode).toBe(200);
    expect(res.body.books).toBeInstanceOf(Array);
    expect(res.body.books).toHaveLength(1);
    expect(res.body.books[0]).toEqual(testBook);
  });
});

describe("GET /books/:isbn", () => {
  test("returns a single book", async () => {
    const res = await request(app).get(`/books/${testBook.isbn}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.book).toEqual(testBook);
  });

  test("returns 404 for invalid ISBN", async () => {
    const res = await request(app).get("/books/invalidisbn");

    expect(res.statusCode).toBe(404);
  });
});

describe("POST /books", () => {
  test("creates a new book", async () => {
    const newBook = {
      isbn: "0987654321",
      amazon_url: "http://amazon.com/book2",
      author: "Author Two",
      language: "English",
      pages: 200,
      publisher: "Publisher Two",
      title: "Book Two",
      year: 2020,
    };

    const res = await request(app).post("/books").send(newBook);

    expect(res.statusCode).toBe(201);
    expect(res.body.book).toEqual(newBook);
  });

  test("returns 400 when required fields are missing", async () => {
    const invalidBook = {
      isbn: "0987654321",
      title: "Missing Fields Book",
    };

    const res = await request(app).post("/books").send(invalidBook);

    expect(res.statusCode).toBe(400);
  });

  test("returns 400 when validation fails", async () => {
    const invalidBook = {
      isbn: "0987654321",
      amazon_url: "not-a-url",
      author: "Author Two",
      language: "English",
      pages: "not-a-number",
      publisher: "Publisher Two",
      title: "Book Two",
      year: 2020,
    };

    const res = await request(app).post("/books").send(invalidBook);

    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /books/:isbn", () => {
  test("updates an existing book", async () => {
    const updatedBook = {
      amazon_url: "http://amazon.com/updated",
      author: "Updated Author",
      language: "Spanish",
      pages: 300,
      publisher: "Updated Publisher",
      title: "Updated Book",
      year: 2024,
    };

    const res = await request(app)
      .put(`/books/${testBook.isbn}`)
      .send(updatedBook);

    expect(res.statusCode).toBe(200);
    expect(res.body.book).toEqual({
      isbn: testBook.isbn,
      ...updatedBook,
    });
  });

  test("returns 400 when validation fails", async () => {
    const invalidBook = {
      amazon_url: "not-a-url",
      author: "Updated Author",
      language: "Spanish",
      pages: "not-a-number",
      publisher: "Updated Publisher",
      title: "Updated Book",
      year: 2024,
    };

    const res = await request(app)
      .put(`/books/${testBook.isbn}`)
      .send(invalidBook);

    expect(res.statusCode).toBe(400);
  });

  test("returns 404 for invalid ISBN", async () => {
    const updatedBook = {
      amazon_url: "http://amazon.com/updated",
      author: "Updated Author",
      language: "Spanish",
      pages: 300,
      publisher: "Updated Publisher",
      title: "Updated Book",
      year: 2024,
    };

    const res = await request(app).put("/books/invalidisbn").send(updatedBook);

    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /books/:isbn", () => {
  test("deletes an existing book", async () => {
    const res = await request(app).delete(`/books/${testBook.isbn}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Book deleted",
    });
  });

  test("returns 404 for invalid ISBN", async () => {
    const res = await request(app).delete("/books/invalidisbn");

    expect(res.statusCode).toBe(404);
  });
});
