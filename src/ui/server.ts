import http from "node:http";
import { loadJobs, loadQueue, saveQueue } from "../storage/store.js";

export function startUiServer(port = 5179) {
  const server = http.createServer((req, res) => {
    if (!req.url) return;
    // CORS for Vite dev server
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    if (req.url === "/api/jobs") {
      const jobs = loadJobs();
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(jobs));
      return;
    }
    if (req.url === "/api/queue" && req.method === "GET") {
      const queue = loadQueue();
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(queue));
      return;
    }
    if (req.url === "/api/queue" && req.method === "POST") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        const { ids } = JSON.parse(body || "{\"ids\":[]}");
        saveQueue(Array.isArray(ids) ? ids : []);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      });
      return;
    }
    res.writeHead(404);
    res.end("Not found");
  });
  server.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
  });
  return server;
}
