/**
 * takes url and fetch options to perform an API request.
 * @param {String} url {API url}
 * @param {Object} options {method, body, headers}
 * @returns {Object} parsed response
 * @example
 * const url = "wwww.example.com";
 * var myHeaders = new Headers();
 * myHeaders.append("Authorization", "token");
 * const options = {method: GET,
 *                  body: "",
 *                  headers: myHeaders};
 * const details = callAPI(url, options);
 */
export async function callAPI(url, options) {
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Creates a options object for the fetch with provided parameters.
 */
export class MyOptions {
  /**
   * creates an object with method, body, headers.
   * @param {String} method GET, POST, PUT, DELETE, etc.
   * @param {Headers} headers Headers(), Auths, content-types etc.
   * @param {object} body can be empty if not needed.
   * @return {object} returns options object.
   */
  constructor(method, headers, body = "") {
    if (body === "") {
      return {
        method: method,
        headers: headers,
      };
    } else {
      return {
        method: method,
        headers: headers,
        body: body,
      };
    }
  }
}
