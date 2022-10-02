import { API } from "../../main.mjs";
import { getPostsFeed } from "./getPosts.mjs";

export async function editPost(id, errorReporting, form) {
  try{
  const formData = new FormData(form);
  const bodyData = Object.fromEntries(formData.entries());
  const response = await API.updatePost(JSON.stringify(bodyData), id);
  console.log(response);
  if(response.statusCode){
    errorReporting.innerHTML = response.message;
    return false
  } else {
    errorReporting.innerHTML = "";
    form.reset();
    return response
  }}catch (error){
    console.log(error);
    errorReporting.innerHTML = error.message
  }
}

