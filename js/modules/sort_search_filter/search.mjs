import { API } from "../main.mjs";
import { createAvatar } from "../render/user_avatar.mjs";
import { createAPost } from "../render/post_cards.mjs";

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
  function searchPosts(input, data){
  const query = input.value.toLowerCase();
  let filteredPosts = data.filter((post) =>{
    const author = post.author.name.toLowerCase()
    const title = post.title.toLowerCase()
    const body = post.body.toLowerCase()
    if(author.startsWith(query.toLowerCase())){
      return true;
    } else if(input.value.length > 1 && title.indexOf(query.toLowerCase()) >= 0){
      return true;
    } else if(input.value.length > 2 && body.indexOf(query.toLowerCase()) >= 0){
      return true;
    } 
  });
  if(query.length === 0){
    filteredPosts = [];
  }
  return filteredPosts
}

/**
 * Sets up post search data and listener.
 */
export async function loadPostSearch(){

  const searchFeedContainer = document.querySelector("#search-post-feed");
  const searchPostsInput = document.querySelector("#search-posts");
  searchPostsInput.setAttribute("disabled", true);
  const postData = await API.getAllPosts();
  searchPostsInput.removeAttribute("disabled");

  function displaySearch(){
    const results = searchPosts(searchPostsInput, postData);
    searchFeedContainer.innerHTML = `<p class="py-1 text-center">Found ${results.length} Results <p>`;
    results.forEach(post => {
      searchFeedContainer.appendChild(createAPost(post));
    }); 
    if(results.length === 0){
      searchFeedContainer.innerHTML = `<p class="py-1 text-center">No Results Found<p>`
    }
  }

  searchPostsInput.addEventListener("keyup", displaySearch);
}