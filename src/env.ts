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

  const value = process.env[name.toUpperCase()];

  if (value === undefined) {
    return;
  }

  let ret: unknown;

  switch (typeof defaultValue) {
    case 'string':
      ret = value;
    case 'boolean':
      ret = (value === 'true')
        ? true
        : false;
    case 'number':
        ret = +value;
    default:
      break;
  }

  return ret as T;
}
