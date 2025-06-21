/**
 * Converts a key-value object into a URL query string.
 * If the value for a given key is an array, it is converted into a repeating query parameter.
 * Spaces in the values are replaced with '%20' to ensure the query string is URL encoded.
 * @param {Record<string, string>} params A key-value object representing the query string.
 * @returns {string} The query string as a URL encoded string.
 */
export function convertRequestParams(params: Record<string, string>): string {
  if (!params) return '';
  let url = '?';
  for (const key of Object.keys(params)) {
    if (Array.isArray(params[key])) {
      for (const value of params[key]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        url += `${url.length === 1 ? '' : '&'}${key}=${value.replaceAll(' ', '%20')}`;
      }
    } else {
      url += `${url.length === 1 ? '' : '&'}${key}=${params[key].replaceAll(' ', '%20')}`;
    }
  }

  return url;
}
