import { loadConfig } from "./config/load.js";
import { run } from "./core/run.js";

const config = loadConfig();

run(config).catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
