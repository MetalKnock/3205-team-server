import http, { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import dotenv from 'dotenv';
import { sendResponse } from './utils/response.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const { pathname } = new URL(`http://${req.headers.host}${req.url}`);

  if (pathname === '/users') {
    if (req.method === 'POST') {
      console.info('test');
    } else {
      sendResponse(res, 405, 'Method Not Allowed');
    }
  } else {
    sendResponse(res, 404, 'Not Found');
  }
});

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
