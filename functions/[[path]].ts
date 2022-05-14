export interface Environment {
  UPSTREAM_ORIGIN: string;
}

export async function onRequestGet({
  functionPath,
  next,
  env,
}: EventContext<Environment, any, any>) {
  const pagesResponse = await next();

  if (pagesResponse.status === 404) {
    return fetch(`https://${env.UPSTREAM_ORIGIN}/${functionPath}`);
  }

  return pagesResponse;
}
