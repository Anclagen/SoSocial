import {setLocalItem, deleteLocalItem, getLocalItem, callAPI, MyOptions, isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, isValidImgLink, login, register} from "./api/authentication.mjs"
import {handleAPI} from "./api/api_handler.mjs"
import {makeAPostListener} from "./api/posts/createPost.mjs"
import {getPostsFeed, getUsersPosts} from "./api/posts/getPosts.mjs"
import {createAPost, renderPost, renderPosts} from "./render/post_cards.mjs"
import {createAvatar} from "./render/user_avatar.mjs"
import {showInput} from "./functionality/accordion.mjs"
import {addEditProfileListeners} from "./api/profile/updateProfile.mjs"
import {renderProfileContent} from "./render/profile_head.mjs";
import { followUserBtn, renderFollowers} from "./functionality/followers.mjs"
import { loadPostSearch} from "./sort_search_filter/search.mjs"
import { getFollowersAddSearch } from "./sort_search_filter/search_followers.mjs"

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
    // const logout = document.querySelector("#logout");
    // logout.classList.add("d-none");
    return {};
  }
  // const logout = document.querySelector("#logout");
  // logout.classList.add("d-none")
};

export const API = initialiseAPIHandler();

/**
 * Checks if a query string is present to define a user.
 * for profile page
 * @param {Class} API insert defined handleAPI class into this.
 * @returns {String} Username returned for fetch request.
 */
 export function defineUser(){
  let user = API.name;
  const qstring = new URLSearchParams(window.location.search);
  if(qstring.has("profile")){
    user = qstring.get("profile");
  } 
  return user
}
//defines the owner of the profile
export const user = defineUser();

export * from "./functionality/followers.mjs"
export * from "./api/posts/getPosts.mjs"
export * from "./render/profile_head.mjs";
export * from "./api/authentication.mjs"
export * from "./api/posts/createPost.mjs"
export * from "./api/profile/updateProfile.mjs"
export * from "./render/post_cards.mjs"
export * from "./render/user_avatar.mjs"
export * from "./functionality/accordion.mjs"
export * from "./sort_search_filter/search.mjs"
export * from "./sort_search_filter/search_followers.mjs"

