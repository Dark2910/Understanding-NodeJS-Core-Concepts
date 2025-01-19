const net = require("net");

const socket = net.createConnection({ host: "::1", port: 8000 }, () => {

    const head = Buffer.from(
        "504f5354202f6372656174652d706f737420485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a204564640d0a486f73743a206c6f63616c686f73743a383030300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2037360d0a0d0a",
        "hex"
    );

    const body = Buffer.from(
        "7b227469746c65223a225469746c65206f66206d7920706f7374222c22626f6479223a225468697320697320736f6d65207465787420616e64206d6f726520616e64206d6f72652e2e2e227d",
        "hex"
    );

    socket.write(Buffer.concat([head, body]));
})

socket.on("data", (chunk) => {
    console.log("Received Response:");
    console.log(chunk.toString("utf-8"));
    console.log(chunk.toString("hex"));
    socket.end();
});

socket.on("end", () => {
    console.log("Connection ended.");
});

/** Bytes as Hex + ASCII Dump  
0000   48 54 54 50 2f 31 2e 31 20 34 30 30 20 42 61 64   HTTP/1.1 400 Bad
0010   20 52 65 71 75 65 73 74 0d 0a 43 6f 6e 6e 65 63    Request..Connec
0020   74 69 6f 6e 3a 20 63 6c 6f 73 65 0d 0a 0d 0a      tion: close....
*/

/** Hex Dump 
0000   48 54 54 50 2f 31 2e 31 20 34 30 30 20 42 61 64
0010   20 52 65 71 75 65 73 74 0d 0a 43 6f 6e 6e 65 63
0020   74 69 6f 6e 3a 20 63 6c 6f 73 65 0d 0a 0d 0a
*/

/** Hex Stream 
485454502f312e31203430302042616420526571756573740d0a436f6e6e656374696f6e3a20636c6f73650d0a0d0a
*/

/** Base64 
SFRUUC8xLjEgNDAwIEJhZCBSZXF1ZXN0DQpDb25uZWN0aW9uOiBjbG9zZQ0KDQo=
*/