/** ExpressError extends the normal JS Error so we can easily
 * add a status when we make an instance of it.
 *
 * The error-handling middleware will return this.
 */

class ExpressError extends Error {
  constructor(message, status = 500) {
    super(message);

    this.name = "ExpressError";
    this.status = status;
  }
}

export default ExpressError;
