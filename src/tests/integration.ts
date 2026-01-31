import { startUiServer } from "../ui/server.js";

async function main() {
  const port = 5180;
  const server = startUiServer(port);

  const health = await fetch(`http://localhost:${port}/health`).then((r) => r.json());
  if (!health.ok) throw new Error("Health check failed");

  const jobs = await fetch(`http://localhost:${port}/api/jobs`).then((r) => r.json());
  if (!Array.isArray(jobs)) throw new Error("Jobs endpoint did not return array");

  const queue = await fetch(`http://localhost:${port}/api/queue`).then((r) => r.json());
  if (!Array.isArray(queue)) throw new Error("Queue endpoint did not return array");

  server.close();
  console.log("Integration test passed");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
