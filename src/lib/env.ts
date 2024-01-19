export function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing environment variable ${key}`);
    return "";
  }

  return value;
}
