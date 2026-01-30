import fs from "node:fs";
import path from "node:path";
import type { Job } from "../types/job.js";

const DATA_DIR = path.resolve(process.cwd(), ".data");
const JOBS_PATH = path.join(DATA_DIR, "jobs.json");
const QUEUE_PATH = path.join(DATA_DIR, "queue.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function loadJobs(): Job[] {
  ensureDir();
  if (!fs.existsSync(JOBS_PATH)) return [];
  return JSON.parse(fs.readFileSync(JOBS_PATH, "utf-8"));
}

export function saveJobs(jobs: Job[]) {
  ensureDir();
  fs.writeFileSync(JOBS_PATH, JSON.stringify(jobs, null, 2));
}

export function loadQueue(): string[] {
  ensureDir();
  if (!fs.existsSync(QUEUE_PATH)) return [];
  return JSON.parse(fs.readFileSync(QUEUE_PATH, "utf-8"));
}

export function saveQueue(ids: string[]) {
  ensureDir();
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(ids, null, 2));
}
