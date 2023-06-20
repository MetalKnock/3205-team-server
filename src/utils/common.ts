import { IncomingMessage } from 'http';

function getReqData(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk: Buffer) => {
        body += String(chunk);
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

function isValidNumber(number: string) {
  return number.match(/^[0-9]{6}$/g);
}

export { getReqData, isValidNumber };
