import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

app.use((_req, res) => {
  res.status(200).send("Hello, world!");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
