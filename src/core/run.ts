import type { AppConfig } from "../config/schema.js";
import { loadLinkedInProfile } from "../integrations/linkedin/profile.js";
import { startUiServer } from "../ui/server.js";

export async function run(config: AppConfig) {
  console.log("ApplyNow starting", { project: config.projectName });
  startUiServer();
  if (config.linkedinImport.enabled) {
    await loadLinkedInProfile();
  }
  // TODO: search sources, build queue, apply
}
