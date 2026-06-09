import db from "../db.js";
import ExpressError from "../expressError.js";

/** Collection of related methods for books. */

class Book {
  /** Given an isbn, return book data with that isbn:
   *
   * => { isbn, amazon_url, author, language, pages, publisher, title, year }
   */
  static async findOne(isbn) {
    const result = await db.query(
      `SELECT isbn,
              amazon_url,
              author,
              language,
              pages,
              publisher,
              title,
              year
       FROM books
       WHERE isbn = $1`,
      [isbn],
    );

    const book = result.rows[0];

    if (!book) {
      throw new ExpressError(`There is no book with an isbn '${isbn}'`, 404);
    }

    return book;
  }

  /** Return array of book data:
   *
   * => [{ isbn, amazon_url, author, language, pages, publisher, title, year }, ...]
   */
  static async findAll() {
    const result = await db.query(
      `SELECT isbn,
              amazon_url,
              author,
              language,
              pages,
              publisher,
              title,
              year
       FROM books
       ORDER BY title`,
    );

    return result.rows;
  }

  /** Create book in database from data, return book data:
   *
   * { isbn, amazon_url, author, language, pages, publisher, title, year }
   *
   * => { isbn, amazon_url, author, language, pages, publisher, title, year }
   */
  static async create(data) {
    const result = await db.query(
      `INSERT INTO books (
              isbn,
              amazon_url,
              author,
              language,
              pages,
              publisher,
              title,
              year
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING isbn,
                 amazon_url,
                 author,
                 language,
                 pages,
                 publisher,
                 title,
                 year`,
      [
        data.isbn,
        data.amazon_url,
        data.author,
        data.language,
        data.pages,
        data.publisher,
        data.title,
        data.year,
      ],
    );

    return result.rows[0];
  }

  /** Update data with matching isbn to data, return updated book.
   *
   * { isbn, amazon_url, author, language, pages, publisher, title, year }
   *
   * => { isbn, amazon_url, author, language, pages, publisher, title, year }
   */
  static async update(isbn, data) {
    const result = await db.query(
      `UPDATE books
       SET amazon_url = $1,
           author = $2,
           language = $3,
           pages = $4,
           publisher = $5,
           title = $6,
           year = $7
       WHERE isbn = $8
       RETURNING isbn,
                 amazon_url,
                 author,
                 language,
                 pages,
                 publisher,
                 title,
                 year`,
      [
        data.amazon_url,
        data.author,
        data.language,
        data.pages,
        data.publisher,
        data.title,
        data.year,
        isbn,
      ],
    );

    const book = result.rows[0];

    if (!book) {
      throw new ExpressError(`There is no book with an isbn '${isbn}'`, 404);
    }

    return book;
  }

  /** Remove book with matching isbn. Returns undefined. */
  static async remove(isbn) {
    const result = await db.query(
      `DELETE FROM books
       WHERE isbn = $1
       RETURNING isbn`,
      [isbn],
    );

    const book = result.rows[0];

    if (!book) {
      throw new ExpressError(`There is no book with an isbn '${isbn}'`, 404);
    }
  }
}

export default Book;
