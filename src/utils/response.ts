import { IncomingMessage, ServerResponse } from 'http';

function sendResponse<T>(res: ServerResponse, statusCode: number, data: T) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function handleRequest(
  handler: (req: IncomingMessage, res: ServerResponse) => Promise<void>,
  req: IncomingMessage,
  res: ServerResponse
) {
  setTimeout(async () => {
    try {
      await handler(req, res);
    } catch (error) {
      sendResponse(res, 500, 'Internal Server Error');
    }
  }, 5000);
}

export { sendResponse, handleRequest };
