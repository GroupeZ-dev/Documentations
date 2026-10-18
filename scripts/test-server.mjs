import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout } from "node:timers/promises";

const reservation = createServer();
await new Promise((resolve) => reservation.listen(0, "127.0.0.1", resolve));
const port = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["server.cjs"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, PORT: String(port), NODE_ENV: "production" },
});
let output = "";
for (const stream of [server.stdout, server.stderr])
  stream.on("data", (data) => {
    output = (output + data).slice(-16000);
  });
let closed = false;
server.once("exit", () => {
  closed = true;
});
try {
  console.log(
    "Starting a local Node.js server for HTTP/MCP/media integration checks...",
  );
  const deadline = Date.now() + 120000;
  let ready = false;
  while (Date.now() < deadline && !closed) {
    try {
      const response = await fetch(origin, {
        signal: AbortSignal.timeout(3000),
      });
      await response.arrayBuffer();
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Waiting for the local runtime. */
    }
    await setTimeout(1000);
  }
  if (!ready)
    throw new Error("Node.js server did not become ready.\n" + output);
  const checks = spawn(process.execPath, ["scripts/smoke-test.mjs"], {
    stdio: "inherit",
    env: { ...process.env, TEST_ORIGIN: origin },
  });
  const code = await new Promise((resolve, reject) => {
    checks.once("error", reject);
    checks.once("exit", resolve);
  });
  if (code !== 0)
    throw new Error("Node.js server integration checks failed.\n" + output);
} finally {
  server.kill("SIGINT");
}
