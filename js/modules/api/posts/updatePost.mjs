import { API } from "../../main.mjs";

/**
 * Function to handle parameters for edit post request
 * @param {Number} id post id 
 * @param {Element} errorReporting Container for error messaging
 * @param {Element} form Form to be submitted.
 * @returns fetch response.
 */
export async function editPost(id, errorReporting, form) {
  try{
  const formData = new FormData(form);
  const bodyData = Object.fromEntries(formData.entries());
  if(bodyData.media === ""){
    delete bodyData.media;
  }
  if(bodyData.tags){
    bodyData.tags.split(",").map(tag => tag.trim());
  }
  const response = await API.updatePost(JSON.stringify(bodyData), id);
  console.log(response);
  if(response.statusCode){
    errorReporting.innerHTML = response.message;
    return false
  } else {
    errorReporting.innerHTML = "";
    return response
  }}catch (error){
    console.log(error);
    errorReporting.innerHTML = error.message
  }
}

