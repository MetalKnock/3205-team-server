import { ServerResponse } from 'http';

function sendResponse<T>(res: ServerResponse, statusCode: number, data: T) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export { sendResponse };
