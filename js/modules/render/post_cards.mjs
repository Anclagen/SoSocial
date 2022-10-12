import { API } from "../main.mjs";
import { createPostBody } from "./post_card_components/post_card_body.mjs";
import { createPostFooter } from "./post_card_components/post_card_footer.mjs";
import { createPostHeader } from "./post_card_components/post_card_header.mjs";
import { createOptions } from "./post_card_components/post_card_options.mjs";

/**
 * Takes post data and creates a html for appending to page.
 * Also include listeners for forms, menus and container visibility.
 * @param {Object} data Post data object
 * @param {boolean} modal if true generates replies.
 * @returns HTML to be appended
 */
function createAPost(data, modal = false) {
  const postData = { ...data, modal };
  const post = document.createElement("div");
  post.classList = "card bg-secondary mb-3";
  post.setAttribute("data-page-post-id", postData.id);

  //------------ post header -----------------
  const postHeadContainer = createPostHeader(postData);
  post.appendChild(postHeadContainer);

  //--------------- Edit and Delete Options ------------------------
  // add post edit options you your posts only
  if (postData.author.name === API.name) {
    const postHeadOptions = createOptions(postData, post);
    postHeadContainer.childNodes[0].appendChild(postHeadOptions);
  }

  //------------ post body ---------------------
  const postBody = document.createElement("div");
  postBody.appendChild(createPostBody(postData));
  post.appendChild(postBody);

  //------------ post footer ----------------
  const postFooter = document.createElement("div");
  postFooter.append(createPostFooter(postData, modal));
  post.appendChild(postFooter);

  return post;
}

/**
 * renders a single post to a page
 * @param {Object} postData Post data object
 * @param {Element} container element to append Html to
 * @param {Boolean} modal true if displaying in modal
 */
export function renderPost(postData, container, modal) {
  container.append(createAPost(postData, modal));
}

/**
 * renders an array of post objects to an element
 * @param {Object} postsData Post data object
 * @param {Element} container element to append Html to
 */
export function renderPosts(postsData, container) {
  container.innerHTML = "";
  postsData.forEach((post) => container.append(createAPost(post, false)));
}
