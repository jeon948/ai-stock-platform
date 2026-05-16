import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import connectDB from "./config/db.js";

import stockRoutes from "./routes/stockRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import { initWebSocket } from "./websocket/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB();

  // ✅ Stock Routes
  app.use("/api/stocks", stockRoutes);

  // ✅ News Routes
  app.use("/news", newsRoutes);

  // ✅ AI Routes
  app.use("/api/ai", aiRoutes);

  // ✅ Health Route
  app.get("/", (req, res) => {
    res.send("🚀 API Running");
  });

  // ✅ Initialize WebSocket
  initWebSocket(server);

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
  });
};

startServer();