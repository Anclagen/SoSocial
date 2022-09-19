import {callAPI, MyOptions} from "./api.mjs"
import {setLocalItem, deleteLocalItem, getLocalItem} from "./localStorage.mjs"
import {isValidEmail, isValidInputLength, hasMatchingPasswords, isValidUsername} from "./validation.mjs"

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
  pathRegister = "https://nf-api.onrender.com/api/v1/social/auth/register";
  pathPosts = "https://nf-api.onrender.com/api/v1/social/auth/posts";
  pathProfile = "https://nf-api.onrender.com/api/v1/social/auth/profile";

  headers = {"Content-Type": "application/json", "Authorization":""}

  constructor({accessToken}){
    this.headers.Authorization = `Bearer ${accessToken}`
  }
  
  logthis(){
    console.log("its alive!!!")
  }

  async getPosts(){
    return await callAPI(this.pathProfile, this.headers);
  }

  getPost(id){}

  async getProfiles(){
    return await callAPI(this.pathProfile, this.headers);
  }

  getProfile(User){}
  createPost(){}
  updatePost(){}
  deletePost(){}
  replyToPost(id, replyID = id){}
  reactToPost(id){}
}



export {setLocalItem, deleteLocalItem, getLocalItem, isValidUsername, isValidEmail, isValidInputLength, hasMatchingPasswords, MyOptions, callAPI}  