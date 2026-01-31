import fs from "node:fs";
import path from "node:path";
import type { LinkedInProfile } from "../types/profile.js";

const DATA_DIR = path.resolve(process.cwd(), ".data");
const PROFILE_PATH = path.join(DATA_DIR, "linkedin_profile.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function loadLinkedInProfileFromDisk(): LinkedInProfile | null {
  ensureDir();
  if (!fs.existsSync(PROFILE_PATH)) return null;
  return JSON.parse(fs.readFileSync(PROFILE_PATH, "utf-8"));
}

export function saveLinkedInProfileToDisk(profile: LinkedInProfile) {
  ensureDir();
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(profile, null, 2));
}
