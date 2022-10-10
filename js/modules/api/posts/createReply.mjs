import { API } from "../../main.mjs";
import { createAReply } from "../../render/post_card_components/post_replies.mjs";
import { showContainer } from "../../main.mjs";

/**
 * Creates a reply to a post, taking post id from form data attribute for request
 * Then prepends response to parents reply container and closes form.
 * @param {Event} submit
 */
export async function createNewReply(submit) {
  try {
    let parentId = "";
    if (submit.target.getAttribute("data-parentID")) {
      parentId = Number(submit.target.getAttribute("data-parentID"));
      console.log(parentId);
    }
    let id = Number(submit.target.getAttribute("data-postID"));
    submit.preventDefault();
    const formData = new FormData(submit.target);
    const bodyData = Object.fromEntries(formData.entries());
    if (parentId) {
      bodyData.replyToId = id;
      id = parentId;
    }
    const response = await API.replyToPost(id, JSON.stringify(bodyData));
    submit.target.reset();
    //close form
    showContainer(submit.target.parentNode);
    // add reply
    const reply = submit.target.parentNode.parentNode.querySelector(".replies-container");
    //check for reply to reply, parentId not provided
    response.postId = id;
    if (parentId) {
      response.postId = parentId;
    }
    reply.prepend(createAReply(response));
  } catch (error) {
    console.log(error);
  }
}
