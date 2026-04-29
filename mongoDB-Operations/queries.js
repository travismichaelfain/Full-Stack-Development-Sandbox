const users = db.users;
const movies = db.movies;
const theaters = db.theaters;
const sessions = db.sessions;
const comments = db.comments;
const embMovies = db.embedded_movies;

users.insertOne({ name: "John", email: "john@example.com" });

movies.find({ directors: "Christopher Nolan" });

movies.find({ genres: "Action" }).sort({ release_year: -1 });

movies.find({ "imdb.rating": { $gt: 8.0 } }, { title: 1, imdb: 1 });

movies.find({ cast: { $all: ["Tom Hanks", "Tim Allen"] } });

movies.find({
  cast: { $all: ["Tom Hanks", "Tim Allen"] },
  $expr: { $eq: [{ $size: "$cast" }, 2] },
});

movies.find({ genres: "comedy", directors: "Steven Spielberg" });

movies.updateOne({ title: "The Matrix" }, { $set: { availableOn: "Sflix" } });

movies.updateOne({ title: "The Matrix" }, { $inc: { "imdb.metacritic": 1 } });

movies.updateMany({ year: 1997 }, { $addToSet: { genres: "Gen Z" } });

movies.updateMany(
  { "imdb.rating": { $lt: 5.0 } },
  { $inc: { "imdb.rating": 1 } },
);

comments.deleteOne({ _id: ObjectId("...") });

comments.deleteMany({ movie_id: ObjectId("...") });

movies.deleteMany({
  genres: { $size: 0 },
});

movies.aggregate([
  {
    $group: {
      _id: "$year",
      count: { $sum: 1 },
    },
  },
  { $sort: { count: 1 } },
]);

movies.aggregate([
  { $unwind: "$directors" },
  {
    $group: {
      _id: "$directors",
      avg: { $avg: "$imdb.rating" },
    },
  },
  { $sort: { avg: -1 } },
]);
