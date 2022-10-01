import { API } from "../../main.mjs";
import { getPosts } from "./getPosts.mjs";

export async function editPost(id, errorReporting, form) {
  const formData = new FormData(form);
  const bodyData = Object.fromEntries(formData.entries());
  const response = await API.updatePost(JSON.stringify(bodyData), id);
  console.log(response);
  if(response.statusCode){
    errorReporting.innerHTML = response.message;
  } else {
    errorReporting.innerHTML = "";
    form.reset();
    form.classList.remove("open")
    form.parentNode.style.height = 0;
    setTimeout(function () {
      form.classList.toggle('hidden');
      }, 500);
    await getPosts();
  }
}

