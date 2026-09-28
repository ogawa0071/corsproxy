import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors());

app.get("*", async (c) => {
  const proxyUrl = c.req.query("url") ?? "";

  if (!proxyUrl) {
    return c.text("?url=<URL>", 400);
  }

  const response = await fetch(proxyUrl, c.req.raw);
  return new Response(response.body, response);
});

export default app;
