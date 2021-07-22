import express from 'express';
import index from './Routes';

const server = express();
function displayServerMessage() {
    return console.log('My Diary API server is listening on Port 8800');
}
server.use(index);
server.listen(8800, displayServerMessage);

export default server;