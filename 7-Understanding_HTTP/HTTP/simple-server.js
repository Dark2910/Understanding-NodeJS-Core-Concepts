const http = require("node:http");

const server = http.createServer();

server.on("request", (req, res) => {

    console.log("---------METHOD---------");
    console.log(req.method);

    console.log("---------URL---------");
    console.log(req.url);

    console.log("---------HEADERS---------");
    console.log(req.headers);

    const name = req.headers.name;

    console.log("---------BODY---------");

    let data = "";

    req.on("data", (chunk) => {
        data += chunk.toString();
        console.log(data);
    });

    req.on("end", () => {
        data = JSON.parse(data);

        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(
            JSON.stringify({
                message: `Post with title ${data.title} was created by ${name}`,
            })
        );
    });
});

server.listen({ port: 8000, host: "::1" }, () => {
    console.log("Server listening: ", server.address());
});