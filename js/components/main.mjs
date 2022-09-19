import {setLocalItem, deleteLocalItem, getLocalItem, callAPI, MyOptions, isValidUsername, handleAPI, isValidEmail, isValidInputLength, hasMatchingPasswords, login, register} from "./authentication.mjs"

/**
 * Checks for "user" in local storage,
 * then uses access-token to create API handler,
 * if "user" not found redirects to login page,
 * query string added to redirect to previous page. 
 * @returns new handleAPI(userCredentials); 
 *          or redirects to login.
 * @example
 * const APIhandler = updateAPI();
 */
 export function updateAPI(){
  const pageURL = window.location.pathname;
  if(localStorage.user !== undefined){
    const userCredentials = JSON.parse(getLocalItem("user"));
    return new handleAPI(userCredentials);
  } else if(pageURL !== "/login.html"){
    location.href = `/login.html?previous=${pageURL}`;
  }
};

export {isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, login, register, setLocalItem, deleteLocalItem}  