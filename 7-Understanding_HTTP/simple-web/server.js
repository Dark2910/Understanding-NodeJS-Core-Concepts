const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

server.on("request", async (req, res) => {
    console.log(req.url);
    console.log(req.method);

    if (req.url === '/' && req.method === 'GET') {

        res.setHeader("Content-Type", "text/html");

        const srcFile = await fs.open("./public/index.html", "r");
        const readStream = srcFile.createReadStream();

        readStream.pipe(res);
    }

});

server.listen(9000, '::1', () => {
    console.log("Web server is live at: ", server.address());
});