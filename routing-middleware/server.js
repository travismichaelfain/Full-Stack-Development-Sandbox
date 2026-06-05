import app from "./app.js";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const server = app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// console.log(server.address());
