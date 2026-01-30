import { z } from "zod";

export const CriteriaSchema = z.object({
  keywords: z.array(z.string()).default([]),
  locations: z.array(z.string()).default([]),
  remoteOnly: z.boolean().default(false),
  titles: z.array(z.string()).default([]),
  levels: z.array(z.string()).default([]),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional()
});

export const ConfigSchema = z.object({
  projectName: z.string().default("apply_now"),
  criteria: CriteriaSchema,
  sources: z.object({
    linkedin: z.object({
      enabled: z.boolean().default(true),
      maxResults: z.number().default(50)
    }),
    workday: z.object({
      enabled: z.boolean().default(true),
      maxResults: z.number().default(50)
    })
  }),
  automation: z.object({
    mode: z.enum(["fully-automated", "review", "search-only"]).default("fully-automated"),
    rateLimitMs: z.number().default(2500),
    maxAppliesPerDay: z.number().default(20)
  }),
  linkedinImport: z.object({
    enabled: z.boolean().default(true)
  })
});

export type AppConfig = z.infer<typeof ConfigSchema>;
