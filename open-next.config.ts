import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache binding: every page is rendered per request or served from static assets.
export default defineCloudflareConfig({});
