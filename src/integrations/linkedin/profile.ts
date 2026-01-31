import { loadLinkedInProfileFromDisk } from "../../storage/profile.js";

export async function loadLinkedInProfile() {
  // Phase 1 (code-first): load a cached scrape from disk if present.
  // Phase 2: use OpenClaw browser plugin to scrape LinkedIn live and write the cache.
  const profile = loadLinkedInProfileFromDisk();
  if (!profile) {
    console.log(
      "LinkedIn import: no cached profile found. Run the OpenClaw scrape step to generate .data/linkedin_profile.json"
    );
    return;
  }
  console.log("LinkedIn import: loaded cached profile", {
    name: profile.name,
    headline: profile.headline
  });
}
