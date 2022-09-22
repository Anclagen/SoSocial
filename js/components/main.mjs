import {setLocalItem, deleteLocalItem, getLocalItem, callAPI, MyOptions, isValidUsername, handleAPI, isValidEmail, isValidInputLength, hasMatchingPasswords, login, register} from "./api/authentication.mjs"
import {createBasicPost} from "./render/post_cards.mjs"
import {showInput} from "./functionality/accordion.mjs"
import {postComment, newPost} from "./api/post_comments.mjs"

/**
 * Checks for "user" in local storage,
 * then uses access-token to create API handler,
 * if "user" not found redirects to login page,
 * query string added to redirect to previous page. 
 * @returns new handleAPI(userCredentials); 
 *          or redirects to login.
 * @example
 * const APIhandler = initialiseAPIHandler();
 */
 export function initialiseAPIHandler(){
  const pageURL = window.location.pathname;
  if(localStorage.user !== undefined){
    const userCredentials = JSON.parse(getLocalItem("user"));
    return new handleAPI(userCredentials);
  } else if(pageURL !== "/login.html"){
    location.href = `/login.html?previous=${pageURL}`;
  } else {
    const logout = document.querySelector("#logout");
    logout.classList.add("d-none");
    return {};
  }
  const logout = document.querySelector("#logout");
  logout.classList.add("d-none")
};

//export {isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, login, register, setLocalItem, deleteLocalItem}  
export * from "./api/authentication.mjs"
export * from "./api/post_comments.mjs"
export * from "./render/post_cards.mjs"
export * from "./functionality/accordion.mjs"

