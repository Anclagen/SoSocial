import {callAPI, MyOptions} from "./api/api.mjs"
import {setLocalItem, deleteLocalItem, getLocalItem} from "./local_storage/localStorage.mjs"
import {isValidEmail, isValidInputLength, hasMatchingPasswords, isValidUsername} from "./validation/validation.mjs"

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
  headers = {"Content-Type": "application/json", "Authorization":""}


  constructor({accessToken}){
    this.headers.Authorization = `Bearer ${accessToken}`
  }

  logout(){
    deleteLocalItem("user");
    location.href = "/login.html"
  }

  async getPosts(){
    const options = new MyOptions("GET", this.headers);
    return await callAPI(this.pathPosts, options);
  }

  async getPost(id){
    const options = new MyOptions("GET", this.headers);
    return await callAPI(this.pathPosts + "/" + id, options);
  }

  async getProfiles(){
    const options = new MyOptions("GET", this.headers);
    return await callAPI(this.pathProfile, options);
  }

  async getProfile(name){ //might have to just use name
    const options = new MyOptions("GET", this.headers);
    return await callAPI(this.pathProfile + "/" + name, options)
  }

  async updateProfile(name, body){ //might have to just use name
    const options = new MyOptions("GET", this.headers, body);
    return await callAPI(`${this.pathProfile}/${name}/media`, options)
  }

  async createPost(body){
    const options = new MyOptions("POST", this.headers, body);
    return await callAPI(this.pathPosts, options)
  }

  async updatePost(body, id){
    const options = new MyOptions("PUT", this.headers, body);
    return await callAPI(this.pathPosts + "/" + id, options)
  }

  async deletePost(id){
    const options = new MyOptions("DELETE", this.headers);
    return await callAPI(this.pathPosts + "/" + id, options)
  }

  async replyToPost(id, body){
    const options = new MyOptions("POST", this.headers, body);
    return await callAPI(this.pathPosts + "/" + id + "/comment", options)
  }

  async reactToPost(id, symbol){
    const options = new MyOptions("PUT", this.headers);
    return await callAPI(`${this.pathPosts}/${id}/react/${symbol}`, options)
  }
}



export {setLocalItem, deleteLocalItem, getLocalItem, isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, MyOptions, callAPI}  