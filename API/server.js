import express from 'express';
import index from './Routes';

const PORT = process.env.PORT || 8888;

const server = express();
function displayServerMessage() {
  return console.log('My Diary API server is listening on Port 8888');
}
server.use(index);

server.listen(PORT, displayServerMessage);
export default server;
