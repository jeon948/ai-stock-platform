import { WebSocketServer } from "ws";
import WebSocket from "ws";

let clients = [];

export const initWebSocket = (server) => {
  // ✅ Correct way
  const wss = new WebSocketServer({ server });

  // 🔗 Connect to Finnhub
  const finnhub = new WebSocket(
    `wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`
  );

  finnhub.on("open", () => {
    console.log("✅ Connected to Finnhub");

    finnhub.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
    finnhub.send(JSON.stringify({ type: "subscribe", symbol: "TSLA" }));
    finnhub.send(JSON.stringify({ type: "subscribe", symbol: "MSFT" }));
  });

  finnhub.on("message", (data) => {
    const parsed = JSON.parse(data);

    if (parsed.type === "trade") {
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsed));
        }
      });
    }
  });

  // 👥 Frontend clients
  wss.on("connection", (ws) => {
    console.log("👤 Frontend connected");

    clients.push(ws);

    ws.on("close", () => {
      clients = clients.filter((c) => c !== ws);
      console.log("❌ Client disconnected");
    });
  });
};