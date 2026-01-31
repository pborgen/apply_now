import type { AppConfig } from "../../config/schema.js";

type Criteria = AppConfig["criteria"];

export function buildLinkedInJobsSearchUrl(criteria: Criteria) {
  const keywords = criteria.keywords.length
    ? criteria.keywords.join(" ")
    : criteria.titles.join(" ");
  const location = criteria.locations[0] || "";
  const params = new URLSearchParams();
  if (keywords) params.set("keywords", keywords);
  if (location) params.set("location", location);
  if (criteria.remoteOnly) params.set("f_WT", "2"); // LinkedIn remote filter
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}
