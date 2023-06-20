import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {});

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
