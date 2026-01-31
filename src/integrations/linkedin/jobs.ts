import type { AppConfig } from "../../config/schema.js";
import type { Job } from "../../types/job.js";
import { saveJobs } from "../../storage/store.js";
import { buildLinkedInJobsSearchUrl } from "./utils.js";

export type PageDriver = {
  goto: (url: string) => Promise<void>;
  eval: <T>(fn: string) => Promise<T>;
  click?: (selector: string) => Promise<void>;
  wait?: (ms: number) => Promise<void>;
};

export async function scrapeLinkedInJobs(config: AppConfig, page: PageDriver) {
  const url = buildLinkedInJobsSearchUrl(config.criteria);
  await page.goto(url);

  if (page.wait) await page.wait(1500);

  const jobs = await page.eval<Job[]>(`(() => {
    const cards = Array.from(document.querySelectorAll('ul.jobs-search__results-list li, ul.scaffold-layout__list-container li'));
    return cards.map((el) => {
      const a = el.querySelector('a');
      const title = el.querySelector('h3')?.textContent?.trim() || '';
      const company = el.querySelector('h4')?.textContent?.trim() || '';
      const location = el.querySelector('.job-search-card__location')?.textContent?.trim() || '';
      const url = a?.getAttribute('href') || '';
      const id = url || title + '|' + company + '|' + location;
      return {
        id,
        source: 'linkedin',
        title,
        company,
        location,
        url: url.startsWith('http') ? url : (url ? 'https://www.linkedin.com' + url : '')
      };
    }).filter(j => j.title && j.company && j.url);
  })()`);

  saveJobs(jobs);
  console.log(`LinkedIn scrape: saved ${jobs.length} jobs`);
}
