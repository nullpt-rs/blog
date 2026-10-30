import type { EntryContext, RouterContextProvider } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: RouterContextProvider
) {
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        responseStatusCode = 500;
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error);
        }
      },
    }
  );
  shellRendered = true;

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  // Successful document responses are fully static (posts don't change
  // without a deploy), so let Cloudflare's edge cache serve them without
  // running the worker. max-age throttles re-renders to one per 5 min per
  // URL; within the stale-while-revalidate window a cached copy is served
  // immediately while a fresh one is rendered in the background.
  // Docs: https://developers.cloudflare.com/workers/cache/configuration/
  if (responseStatusCode === 200) {
    responseHeaders.set(
      "Cache-Control",
      "public, max-age=300, stale-while-revalidate=3600"
    );
  } else if (responseStatusCode === 404) {
    // Cache unknown paths too, but shorter: a 404 can be requested by bots
    // and crawlers, and each hit otherwise re-renders the error boundary.
    // Explicit max-age also skips Cloudflare's cache-deception check.
    // A 404 cached before a deploy dies with the old worker version, so a
    // newly published post is never stuck behind one.
    responseHeaders.set(
      "Cache-Control",
      "public, max-age=180, stale-while-revalidate=1800"
    );
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
