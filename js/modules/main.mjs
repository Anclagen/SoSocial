import { setLocalItem, getLocalItem, isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, login, register } from "./api/authentication.mjs";
import { handleAPI } from "./api/api_handler.mjs";
import { makeAPostListener } from "./api/posts/createPost.mjs";
import { getPostsFeed, getUsersPosts } from "./api/posts/getPosts.mjs";
import { showInput } from "./functionality/accordion.mjs";
import { addEditProfileListeners } from "./api/profile/updateProfile.mjs";
import { renderProfileContent } from "./render/profile_head.mjs";
import { followUserBtn, renderFollowers } from "./functionality/followers.mjs";
import { getFollowersAddSearch } from "./sort_search_filter/search_followers.mjs";

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
function initialiseAPIHandler() {
  const pageURL = window.location.pathname;
  if (localStorage.user !== undefined) {
    const userCredentials = getLocalItem("user");
    return new handleAPI(userCredentials);
  } else if (pageURL !== "/entry.html") {
    location.href = `/entry.html?previous=${pageURL}`;
  }
  return false;
}

export const API = initialiseAPIHandler();

/**
 * Checks if a query string is present to define a user.
 * for profile page
 * @param {Class} API insert defined handleAPI class into this.
 * @returns {String} Username returned for fetch request.
 */
export function defineUser() {
  let user = "";
  if (API) {
    user = API.name;
  }
  const querystring = new URLSearchParams(window.location.search);
  if (querystring.has("profile")) {
    user = querystring.get("profile");
  }

  return user;
}
//defines the owner of the profile

export const user = defineUser();

export * from "./functionality/followers.mjs";
export * from "./api/posts/getPosts.mjs";
export * from "./render/profile_head.mjs";
export * from "./api/authentication.mjs";
export * from "./api/error_reporting.mjs";
export * from "./api/posts/createPost.mjs";
export * from "./api/profile/updateProfile.mjs";
export * from "./render/post_cards.mjs";
export * from "./functionality/accordion.mjs";
export * from "./sort_search_filter/search_followers.mjs";
