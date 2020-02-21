export function isDefined(value: any, errorMessage: string): void {
  if (value == null) {
    throw new Error(errorMessage);
  }
}

export function containsText(value: string, errorMessage: string): void {
  if (value == null || value.trim() === '') {
    throw new Error(errorMessage);
  }
}

export function notEmptyArray(value: any[], errorMessage: string): void {
  if (value.length <= 0) {
    throw new Error(errorMessage);
  }
}

export function validatePasswordLength(password?: string): void {
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 1024;
  if (!password || !password.length || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error('Choose a password with at least 8 characters.');
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    throw new Error('Choose a password with less than 1024 characters.');
  }
}
