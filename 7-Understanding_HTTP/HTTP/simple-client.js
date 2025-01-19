const http = require("node:http");
const agent = new http.Agent({ keepAlive: true });

const request = http.request({
    agent: agent,
    hostname: "localhost",
    port: 8000,
    method: "POST",
    path: "/create-post",
    headers: {
        "Content-Type": "application/json",
        name: "Edd",
    },

});

request.on("response", (response) => {

    console.log("---------STATUS---------");
    console.log(response.statusCode);

    console.log("---------HEADER---------");
    console.log(response.headers);

    console.log("---------BODY---------");

    response.on("data", (chunk) => {
        console.log(chunk.toString("utf-8"));
    });

    response.on("end", () => {
        console.log("No more data in response.");
    });

});

request.end(
    JSON.stringify({
        title: "Title of my post",
        body: "This is some text and more and more...",
    })
);


// request.write(JSON.stringify({ message: "Hi there!" }));
// request.write(JSON.stringify({ message: "How are you doing?" }));
// request.write(JSON.stringify({ message: "Hey you still there?" }));

// request.end(JSON.stringify({ message: "This is going to be my last message!" }));