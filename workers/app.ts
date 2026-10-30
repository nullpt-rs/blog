import { createContext, createRequestHandler, RouterContextProvider } from "react-router";

// React Router v8 dispatches request context through RouterContextProvider.
// Loaders and actions read Cloudflare runtime data via context.get(cloudflareContext).
export const cloudflareContext = createContext<{
	env: Env;
	ctx: ExecutionContext;
}>();

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE
);

export default {
	async fetch(request, env, ctx) {
		const loadContext = new RouterContextProvider();
		loadContext.set(cloudflareContext, { env, ctx });

		return requestHandler(request, loadContext);
	},
} satisfies ExportedHandler<Env>;
