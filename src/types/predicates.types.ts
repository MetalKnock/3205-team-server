type UserData = { email: string; number?: string };

function isUserData(object: unknown): object is UserData {
  if (typeof object !== 'object' || !object) {
    return false;
  }

  if ('number' in object) {
    return (
      'email' in object && typeof object.email === 'string' && typeof object.number === 'string'
    );
  }
  return 'email' in object && typeof object.email === 'string';
}

export { isUserData };
