import {setLocalItem, deleteLocalItem, getLocalItem, callAPI, MyOptions, isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, isValidImgLink, login, register} from "./api/authentication.mjs"
import {createBasicPost, renderPost, renderPosts} from "./render/post_cards.mjs"
import {createAvatar} from "./render/user_avatar.mjs"
import {showInput} from "./functionality/accordion.mjs"
import {newPost} from "./api/post_comments.mjs"
import {handleAPI} from "./api/handler.mjs"

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
    const userCredentials = getLocalItem("user");
    return new handleAPI(userCredentials);
  } else if(pageURL !== "/entry.html"){
    location.href = `/entry.html?previous=${pageURL}`;
  } else {
    const logout = document.querySelector("#logout");
    logout.classList.add("d-none");
    return {};
  }
  const logout = document.querySelector("#logout");
  logout.classList.add("d-none")
};

export const API = initialiseAPIHandler();
export * from "./api/authentication.mjs"
export * from "./api/post_comments.mjs"
export * from "./render/post_cards.mjs"
export * from "./render/user_avatar.mjs"
export * from "./functionality/accordion.mjs"

