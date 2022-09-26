import {callAPI, MyOptions} from "./api.mjs"
import {setLocalItem, deleteLocalItem, getLocalItem} from "../local_storage/localStorage.mjs"
import {isValidEmail, isValidInputLength, hasMatchingPasswords, isValidUsername, isValidImgLink} from "../validation/validation.mjs"

/**
 * Logs user in and returns response object.
 * @param {String} email 
 * @param {String} password 
 * @return {Object} Object {name, email, avatar, token}
 */
 export async function login(email, password){
  try{
    const url = "https://nf-api.onrender.com/api/v1/social/auth/login";
    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    
    let body = JSON.stringify({
      "email": email,
      "password": password
    });
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
    };
    
    const response = await fetch(url, requestOptions);
    return response;
  }
  catch(error){
    console.log(response);
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * @param {*} avatar 
 * @param {*} banner 
 * @returns 
 */
export async function register(name, email, password, avatar="", banner=""){
  try{
    const url = "https://nf-api.onrender.com/api/v1/social/auth/register";

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let body = JSON.stringify({
      "name": name,
      "email": email,
      "password": password,
      "avatar": avatar,
      "banner": banner
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
    };
  
    const response = await callAPI(url, requestOptions)
    console.log(response);
    return response;
  }
  catch(error){
    console.log(error);
  }
}

/**
 * Handler class for API, constructed with login response,
 * this encompasses all the functions to get posts and profiles
 * as well as create/update and delete posts.
 */
export class handleAPI {
  baseURL = "https://nf-api.onrender.com/api/v1/social/";
  pathPosts = "https://nf-api.onrender.com/api/v1/social/posts";
  pathProfile = "https://nf-api.onrender.com/api/v1/social/profiles";

  moreDetail = "?_author=true&_comments=true&_reactions=true";
  moreProfileDetail = "?_posts=true&_following=true&_followers=true";

  headers = {"Content-Type": "application/json", "Authorization":""};
  headersNoContent = {"Authorization":""};
  name = "";
  avatar = "";

  /**
   * Pass user object response from login.
   */
  constructor({accessToken, name, avatar}){
    this.headers.Authorization = `Bearer ${accessToken}`;
    this.headersNoContent.Authorization = `Bearer ${accessToken}`;
    this.name = name;
    this.avatar = avatar;
  }

  /**
   * Logs user out, deletes user credentials in local storage,
   * redirects user to login page.
   */
  logout(){
    deleteLocalItem("user");
    location.href = "/login.html"
  }

  /**
   * Returns all the posts in an array.
   * @returns [Array] returns an array of posts
   */
  async getPosts(){
    const options = new MyOptions("GET", this.headers);
    return await callAPI(this.pathPosts + this.moreDetail, options);
  }

  /**
   * Using post ID returns a particular post's data.
   * @param {Post ID} id 
   * @returns {Object} returns and object with all the post's data.
   */
  async getPost(id){
    const options = new MyOptions("GET", this.headers);
    return await callAPI(`${this.pathPosts}/${id}${this.moreDetail}`, options);
  }

  /**
   * Gets all the users profiles
   * @returns [array] returns an array of user data objects.
   */
  async getProfiles(){
    const options = new MyOptions("GET", this.headers);
    return await callAPI(this.pathProfile, options);
  }

  /**
   * Returns the past usernames profile data
   * @param {String} name their username 
   * @returns {object} object with user info
   */
  async getProfile(name){ //might have to just use name
    const options = new MyOptions("GET", this.headers);
    return await callAPI(this.pathProfile + "/" + name  + this.moreProfileDetail, options)
  }

  /**
   * Updates user info, passed into the body
   * @param {Object} body 
   * @returns {Object}
   */
  async updateProfile(body){ //might have to just use name
    const options = new MyOptions("PUT", this.headers, body);
    return await callAPI(`${this.pathProfile}/${this.name}/media`, options)
  }

  /**
 * Follows a user
 * @param {String} username
 * @returns {Object} An object with arrays for followers and following.
 */
  async followProfile(name){ //might have to just use name
    const options = new MyOptions("PUT", this.headersNoContent);
    return await callAPI(`${this.pathProfile}/${name}/follow`, options)
  }

  /**
 * Unfollows a user
 * @param {String} username
 * @returns {Object} An object with arrays for followers and following.
 */
  async unfollowProfile(name){ //might have to just use name
    const options = new MyOptions("PUT", this.headersNoContent);
    return await callAPI(`${this.pathProfile}/${name}/unfollow`, options)
  }


  /**
   * Creates a post with the passed body object
   * @param {Object} body {"title": "string", "body":"string", "tags": ["string"],"media": "string"}
   * @returns {Object} returns the post response object.
   */
  async createPost(body){
    const options = new MyOptions("POST", this.headers, body);
    return await callAPI(this.pathPosts, options)
  }

  /**
   * Updates a specific post.
   * @param {Object} body {"title": "string", "body":"string", "tags": ["string"],"media": "string"}
   * @param {Number} id The posts ID number.
   * @returns 
   */
  async updatePost(body, id){
    const options = new MyOptions("PUT", this.headers, body);
    return await callAPI(this.pathPosts + "/" + id, options)
  }

  /**
   * Deletes a specific post
   * @param {Number} id The posts ID number.
   * @returns 
   */
  async deletePost(id){
    const options = new MyOptions("DELETE", this.headers);
    return await callAPI(this.pathPosts + "/" + id, options)
  }

  /**
   * Reply to a specific post
   * @param {Number} id The primary posts ID 
   * @param {Object} body {body: "String", replyToId: "Number"} replyToNumber used for replying to other replies.
   * @returns {Object} response with the post object.
   */
  async replyToPost(id, body){
    const options = new MyOptions("POST", this.headers, body);
    return await callAPI(this.pathPosts + "/" + id + "/comment", options)
  }

  /**
   * Allows a user to react to a post with a symbol
   * @param {Number} id Primary posts ID
   * @param {Symbol} symbol Symbol you want to react to the post with
   * @returns 
   */
  async reactToPost(id, symbol){ //maybe add body to allow reactions to replies?
    const options = new MyOptions("PUT", this.headers);
    return await callAPI(`${this.pathPosts}/${id}/react/${symbol}`, options)
  }
}



export {setLocalItem, deleteLocalItem, getLocalItem, isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, isValidImgLink, MyOptions, callAPI}  