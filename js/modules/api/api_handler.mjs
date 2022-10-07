import {callAPI, MyOptions} from "./api.mjs"
import {deleteLocalItem} from "../local_storage/localStorage.mjs"

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
  //offset by 100 to show next items 101-200, and offset by 200 to show 201-300 etc..
  offset = "&offset="

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
    location.href = "/entry.html"
  }

   //------------------- Get/Update Posts(s) -----------------------

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
   * Returns all the posts in an array.
   * @returns [Array] returns an array of posts
   */
    async getAllPosts(){
    const options = new MyOptions("GET", this.headers);
    const path = this.pathPosts + this.moreDetail + this.offset;
    let allResults = [];
    const initialResults = await callAPI(this.pathPosts + this.moreDetail + this.offset + 0, options);
        
      /**
       * Keeps on calling the api till we get everything
       * (The Bad Idea function is probably a terrible way to do this.)
       * @param {Array} data an array of results from the api
       * @param {Number} offset The current page of the results 0 = 1, 100 = 2 etc...
       */
      async function getAllResults (data, offset = 0){
        if(data.length === 100){
          allResults.push.apply(allResults, data);
          const newOffset = offset + 100;
          const moreResults = await callAPI(path + newOffset, options);
          await getAllResults(moreResults, newOffset);
        } else {
          allResults.push.apply(allResults, data);
        }
      }
        
      if(initialResults.length === 100){
        await getAllResults(initialResults, 0);
        return allResults;
      } else {
        return initialResults
    }
   
  }

  //------------------- Get/Update Profile(s) -----------------------

  /**
   * Gets all the users profiles
   * @returns [array] returns an array of user data objects.
   */
  async getProfiles(){
    const options = new MyOptions("GET", this.headers);
    return await callAPI(this.pathProfile, options);
  }

  async getAllProfiles(){
    const options = new MyOptions("GET", this.headers);
    let allResults = [];
    const path = this.pathProfile + this.moreProfileDetail + this.offset;
    const initialResults = await callAPI(this.pathProfile + this.moreProfileDetail + this.offset + 0, options);
    
    /**
     * Keeps on calling the api till we get everything
     * (The Bad Idea function is probably a terrible way to do this.)
     * @param {Array} data an array of results from the api
     * @param {Number} offset The current page of the results 0 = 1, 100 = 2 etc...
     */
    async function getAllResults (data, offset = 0){
      if(data.length === 100){
        allResults.push.apply(allResults, data);
        const newOffset = offset + 100;
        const moreResults = await callAPI(path + newOffset, options);
        await getAllResults(moreResults, newOffset);
      } else {
        allResults.push.apply(allResults, data);
      }
    }

    if(initialResults.length === 100){
      await getAllResults(initialResults, 0);
      return allResults;
    } else {
      return initialResults
    }
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

  //------------------- Follow/Unfollow -----------------------

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

  //------------------- Create/Update/Delete Posts -----------------------

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

  //------------------- Reactions -----------------------
  
  /**
   * Allows a user to react to a post like symbol
   * @param {Number} id Primary posts ID
   * @returns 
   */
  async likePost(id){ //maybe add body to allow reactions to replies?
    const options = new MyOptions("PUT", this.headersNoContent);
    return await callAPI(`${this.pathPosts}/${id}/react/👍`, options)
  }

    /**
   * Allows a user to react to a post dislike symbol
   * @param {Number} id Primary posts ID
   * @returns 
   */
     async dislikePost(id){ //maybe add body to allow reactions to replies?
      const options = new MyOptions("PUT", this.headersNoContent);
      return await callAPI(`${this.pathPosts}/${id}/react/👎`, options)
    }
}