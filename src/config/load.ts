import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { ConfigSchema, type AppConfig } from "./schema.js";

export function loadConfig(): AppConfig {
  dotenv.config();
  const configPath = process.env.APPLY_NOW_CONFIG || path.resolve(process.cwd(), "config.json");
  const raw = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf-8") : "{}";
  const parsed = JSON.parse(raw);
  return ConfigSchema.parse(parsed);
}
