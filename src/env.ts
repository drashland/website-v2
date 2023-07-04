/**
 * Get an environment variable value.
 * @param name The nevironment variable name.
 * @param defaultValue The default value if no evnrionment variable is found.
 * @returns The value of the environment variable.
 */
export default function env<T>(name: string, defaultValue: T): T {
  if (!name) {
    return;
  }

  const uppercasedName = name.toUpperCase();

  const value = process.env[uppercasedName];

  if (!(uppercasedName in process.env)) {
    return defaultValue;
  }

  if (value === undefined) {
    return value as T;
  }

  let ret: unknown;

  switch (typeof defaultValue) {
    case "string":
      ret = value;
      break;
    case "boolean":
      ret = (value === "true") ? true : false;
      break;
    case "number":
      ret = +value;
      break;
    default:
      ret = value;
      break;
  }

  return ret as T;
}
