export function verifyPassword(password: string) {
  let passCheck = {
    min_characters: false,
    min_lowercase: false,
    min_numbers: false,
    min_uppercase: false,
  };

  password.length >= 8
    ? (passCheck.min_characters = true)
    : (passCheck.min_characters = false);

  /[0-9]/.test(password)
    ? (passCheck.min_numbers = true)
    : (passCheck.min_numbers = false);

  /[a-z]/.test(password)
    ? (passCheck.min_lowercase = true)
    : (passCheck.min_lowercase = false);

  /[A-Z]/.test(password)
    ? (passCheck.min_uppercase = true)
    : (passCheck.min_uppercase = false);

  return passCheck;
}
