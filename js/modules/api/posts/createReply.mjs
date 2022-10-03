import { API } from "../../main.mjs";
import { createAReply } from "../../render/post_replies.mjs";

/**
 * Creates a reply to a post, taking post id from button data attribute for request
 * Then prepends response to parents reply container and closes form.
 * @param {Event} submit 
 */
export async function createNewReply(submit) {
  try{
    const id = submit.target.getAttribute('data-postID');
    submit.preventDefault();
    const formData = new FormData(submit.target);
    const bodyData = Object.fromEntries(formData.entries());
    const response = await API.replyToPost(id, JSON.stringify(bodyData));
    console.log(response);
    submit.target.reset()
    //close form
    submit.target.parentNode.classList.remove("open")
    submit.target.parentNode.style.height = 0;
    setTimeout(function () {
      submit.target.parentNode.classList.toggle('hidden');
      }, 500);
    //reply container
    const reply = submit.target.parentNode.parentNode.querySelector(".replies-container");
    reply.prepend(createAReply(response));
  } catch (error){
    console.log(error);
  }
}
