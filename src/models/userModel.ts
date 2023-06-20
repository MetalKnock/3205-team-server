import { URL } from 'url';
import { readFileSync } from 'fs';
import { Users } from '../types/users.types.js';

function findByParams(email: string, number?: string): Promise<Users> {
  const users: Users = JSON.parse(
    readFileSync(new URL('../users.json', import.meta.url)).toString()
  );
  const filteredUsers = users.filter((user) => {
    if (number) {
      return user.email === email && user.number === number;
    }
    return user.email === email;
  });
  return Promise.resolve(filteredUsers);
}

export { findByParams };
