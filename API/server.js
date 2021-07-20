import express from 'express';
const server = express();
function displayServerMessage() {
    return console.log('My Diary API server is listening on Port 8800');
}
server.listen(8800, displayServerMessage);
export default server;