// Reference selectors for LinkedIn profile scraping.
// These will be validated against live DOM once we run the scraper.

export const selectors = {
  name: "h1",
  headline: ".text-body-medium.break-words",
  location: ".text-body-small.inline.t-black--light.break-words",
  aboutSection: "section[id*='about']",
  experienceSection: "section[id*='experience']",
  educationSection: "section[id*='education']",
  skillsSection: "section[id*='skills']",
  certificationsSection: "section[id*='certifications']",
  contactInfoLink: "a[href*='contact-info']"
};
