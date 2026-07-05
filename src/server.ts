import "dotenv/config";
import express from "express";
import routes from "./routes.js";
import { errorMiddleware } from "./config/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Servidor Gestify server running perfectly!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running successfully on port ${PORT}`);
});
