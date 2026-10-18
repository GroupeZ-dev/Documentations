// Plesk/Passenger needs a startup file; keep routing in Next.js.
process.env.NODE_ENV ||= "production";
const { createServer } = require("node:http");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((request, response) => {
      handle(request, response).catch((error) => {
        console.error(error);
        if (!response.headersSent) response.writeHead(500);
        response.end();
      });
    }).listen(Number(process.env.PORT || 3000));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
