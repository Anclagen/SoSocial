import { API } from "../../main.mjs";
import { createAReply } from "../../render/post_card_components/post_replies.mjs";
import { showContainer } from "../../main.mjs";

/**
 * Creates a reply to a post or reply, taking post id from form data attribute for request
 * Then prepends response to parents reply container and closes form.
 * @param {Event} submit
 */
export async function createNewReply(submit) {
  const reply = submit.target.parentNode.parentNode.querySelector(".replies-container");
  try {
    //require for reply of reply.
    let parentId = "";
    if (submit.target.getAttribute("data-parentID")) {
      parentId = Number(submit.target.getAttribute("data-parentID"));
    }
    let id = Number(submit.target.getAttribute("data-postID"));
    submit.preventDefault();
    const formData = new FormData(submit.target);
    const bodyData = Object.fromEntries(formData.entries());
    //needed for reply of reply to add replyToId to body, and use correct id for fetch.
    if (parentId) {
      bodyData.replyToId = id;
      id = parentId;
    }
    const response = await API.replyToPost(id, JSON.stringify(bodyData));
    if (response.statusCode >= 400) {
      reply.innerHTML += `<p class="text-danger">${response.message}</p>`;
    } else {
      submit.target.reset();
      //close form
      showContainer(submit.target.parentNode);
      //check for reply to reply, parentId not provided
      response.postId = id;
      if (parentId) {
        response.postId = parentId;
      }
      reply.prepend(createAReply(response));
    }
  } catch (error) {
    console.log(error);
    reply.innerHTML += `<p class="text-danger p-1 bg-white">An error occurred, please refresh page and try again</p>`;
  }
}
