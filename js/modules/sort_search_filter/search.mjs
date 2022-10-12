import { API } from "../main.mjs";
import { createAvatar } from "../render/user_avatar.mjs";
import { renderPosts } from "../render/post_cards.mjs";

// ------------------- Search Posts ------------------------

/**
 * Searches posts for post matching your query
 * look at title, body, and author
 * @param {Input} input search input
 * @param {Array} data array of post objects
 * @returns {Array} filtered array
 * @example
 * function search(){
 * const results = searchPosts(searchPostsInput, postData);
 * results.forEach(post => {
 *    feedContainer.appendChild(createBasicPost(post));
 * });}
 * searchPostsInput.addEventListener("keyup", search);
 */
function searchPosts(input, data) {
  const query = input.value.toLowerCase();
  let filteredPosts = data.filter((post) => {
    const author = post.author.name.toLowerCase();
    const title = post.title.toLowerCase();
    const body = post.body.toLowerCase();
    const tags = post.tags.map((tag) => {
      return tag.toLowerCase();
    });
    if (author.startsWith(query)) {
      return true;
    } else if (input.value.length > 1 && title.indexOf(query) >= 0) {
      return true;
    } else if (input.value.length > 2 && body.indexOf(query) >= 0) {
      return true;
    } else {
      let isTag = false;
      tags.forEach((tag) => {
        if (tag.startsWith(query)) {
          isTag = true;
        }
      });
      return isTag;
    }
  });
  if (query.length === 0) {
    filteredPosts = [];
  }
  return filteredPosts;
}

/**
 * Sets up post search listener.
 */
export function loadPostSearch(postData) {
  const searchFeedContainer = document.querySelector("#search-post-feed");
  const searchPostsInput = document.querySelector("#search-posts");
  searchPostsInput.removeAttribute("disabled");
  function displaySearch() {
    const results = searchPosts(searchPostsInput, postData);
    searchFeedContainer.innerHTML = `<p class="py-1 text-center">Found ${results.length} Results <p>`;
    renderPosts(results, searchFeedContainer);
    if (results.length === 0) {
      searchFeedContainer.innerHTML = `<p class="py-1 text-center">No Results Found<p>`;
    }
  }

  searchPostsInput.addEventListener("keyup", displaySearch);
}

//-------------------Experimental ------------------------
/**
 * Searches posts for post matching your query
 * look at title, body, and author
 * @param {Input} input search input
 * @param {Array} data array of post objects
 * @returns {Array} filtered array
 * @example
 * function search(){
 * const results = searchPosts(searchPostsInput, postData);
 * results.forEach(post => {
 *    feedContainer.appendChild(createBasicPost(post));
 * });}
 * searchPostsInput.addEventListener("keyup", search);
 */
function searchImprovedPosts(input, data) {
  const query = input.value.toLowerCase().split(" ");
  console.log(query);
  let filteredPosts = data.filter((post) => {
    const author = post.author.name.toLowerCase();
    const title = post.title.toLowerCase();
    const body = post.body.split(" ").map((word) => word.trim().toLowerCase());
    const tags = post.tags.map((tag) => {
      return tag.toLowerCase();
    });
    if (author.startsWith(query)) {
      return true;
    } else if (input.value.length > 1 && title.indexOf(query) >= 0) {
      return true;
    }
    if (input.value.length > 2) {
      let hasRelevantWords = false;
      body.forEach((word) => {
        if (word.startsWith(query)) {
          hasRelevantWords = true;
          console.log("body");
        }
      });
      return hasRelevantWords;
    } else {
      let isTag = false;
      tags.forEach((tag) => {
        if (tag.startsWith(query)) {
          console.log("yes");
          isTag = true;
        }
      });
      return isTag;
    }
  });
  if (query.length === 0) {
    filteredPosts = [];
  }
  console.log(filteredPosts);
}
