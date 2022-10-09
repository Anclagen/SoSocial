import { callAPI, MyOptions } from "./api.mjs";
import { setLocalItem, deleteLocalItem, getLocalItem } from "../local_storage/localStorage.mjs";
import { isValidEmail, isValidInputLength, hasMatchingPasswords, isValidUsername, isValidImgLink } from "../validation/validation.mjs";

/**
 * Logs user in and returns response object.
 * @param {String} email
 * @param {String} password
 * @return {Object} Object {name, email, avatar, token}
 */
export async function login(bodyData) {
  try {
    const url = "https://nf-api.onrender.com/api/v1/social/auth/login";
    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(bodyData),
    };

    const response = await fetch(url, requestOptions);
    return response;
  } catch (error) {
    console.log(response);
  }
}

/**
 * Register a new user
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @returns {Object} response object
 */
export async function register(bodyData) {
  try {
    const url = "https://nf-api.onrender.com/api/v1/social/auth/register";

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(bodyData),
    };

    const response = await callAPI(url, requestOptions);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { setLocalItem, deleteLocalItem, getLocalItem, isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, isValidImgLink, MyOptions, callAPI };
