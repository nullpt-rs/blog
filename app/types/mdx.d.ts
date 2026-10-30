// React Router generates route types whose `typeof import("*.mdx")` modules
// must structurally match its route-module shape, but the Vite-compiled MDX
// files have no generated declarations of their own. This ambient module
// gives every `*.mdx` file that shape so `tsc -b` can resolve them.
declare module "*.mdx" {
	type AnyFunc = (...args: any[]) => unknown;

	const mdxRouteModule: {
		default?: AnyFunc;
		meta?: AnyFunc;
		links?: AnyFunc;
		headers?: AnyFunc;
		loader?: AnyFunc;
		clientLoader?: AnyFunc;
		action?: AnyFunc;
		clientAction?: AnyFunc;
		HydrateFallback?: AnyFunc;
		ErrorBoundary?: AnyFunc;
		[key: string]: unknown;
	};

	export = mdxRouteModule;
}
