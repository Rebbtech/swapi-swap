import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
const app = express();

const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/", (req, res) => {
  res.json({
    message: "Hellow there!",
  });
});

app.use((error, req, res) => {
  error.status = error.stale ?? 400;
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Serving at http://localhost:${PORT}`);
});
