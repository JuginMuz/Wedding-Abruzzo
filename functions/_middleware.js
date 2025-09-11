// functions/_middleware.js
export const onRequest = async ({ request, env, next }) => {
  // ---- HTTP Basic Auth (one shared password) ----
  const auth = request.headers.get("Authorization") || "";
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic" || !encoded) return unauthorized();

  const decoded = atob(encoded); // "username:password"
  const password = decoded.split(":").slice(1).join(":"); // ignore username
  if (password !== env.SITE_PASSWORD) return unauthorized();

  // ---- Serve site (with SPA fallback) ----
  // First try the static asset via the Pages ASSETS binding:
  let res = await env.ASSETS.fetch(request);

  // If the asset wasn't found and the browser wanted HTML, serve index.html (CRA SPA fallback)
  const wantsHTML = (request.headers.get("accept") || "").includes("text/html");
  if (res.status === 404 && wantsHTML) {
    const url = new URL(request.url);
    res = await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
  }

  return res;
};

function unauthorized() {
  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Wedding Invite"' },
  });
}
