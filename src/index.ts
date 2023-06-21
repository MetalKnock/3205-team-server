import http, { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import dotenv from 'dotenv';
import { handleRequest, sendResponse } from './utils/response.js';
import { searchUsers } from './controllers/userController.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const { pathname } = new URL(`http://${req.headers.host}${req.url}`);

  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN || 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  if (pathname === '/users') {
    if (req.method === 'POST') {
      handleRequest(searchUsers, req, res);
    } else {
      sendResponse(res, 405, 'Method Not Allowed');
    }
  } else {
    sendResponse(res, 404, 'Not Found');
  }
});

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
