import * as EmailValidator from 'email-validator';
import { IncomingMessage, ServerResponse } from 'http';
import { getReqData, isValidNumber } from '../utils/common.js';
import { findByParams } from '../models/userModel.js';
import { sendResponse } from '../utils/response.js';
import { isUserData } from '../types/predicates.types.js';

async function searchUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getReqData(req);
    const parsedData = JSON.parse(body);
    if (!isUserData(parsedData)) {
      throw new Error('Invalid JSON format.');
    }

    const { email, number } = parsedData;
    if (!EmailValidator.validate(email)) {
      throw new Error('Invalid email property.');
    }
    if (number && !isValidNumber(number)) {
      throw new Error('Invalid number property.');
    }

    const users = await findByParams(email, number);
    sendResponse(res, 200, users);
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, 500, { error: error.message });
    }
  }
}

export { searchUsers };
