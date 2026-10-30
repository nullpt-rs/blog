import { defineConfig } from "cf/config";
import * as entrypoint from "./workers/app.ts" with { type: "cf-worker" };

export default defineConfig({
	worker: {
		name: "nullptrs",
		// Selects the Workers runtime build. Keep reasonably recent; bump when
		// adopting new runtime features (e.g. Workers Cache).
		compatibilityDate: "2026-10-01",
		compatibilityFlags: ["nodejs_compat"],
		entrypoint,

		/**
		 * Workers Cache: Cloudflare consults its tiered edge cache BEFORE
		 * running the worker. Cache hits return cached responses without
		 * executing any worker code; misses run the worker and store the
		 * response if its Cache-Control header says it's cacheable.
		 * Docs: https://developers.cloudflare.com/workers/cache/
		 */
		cache: { enabled: true },
		observability: { enabled: true },
	},
});
